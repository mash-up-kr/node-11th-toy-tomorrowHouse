import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { Channel } from 'src/entities/channel.entity';
import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../user/use.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { User } from 'src/entities/user.entity';

// class MockUserRepository {
//   save(channelData) {
//     return channelData;
//   }
// }

describe('ChannelService', () => {
  let service: ChannelService;
  let channelRepository: ChannelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        ChannelRepository,
        UserRepository,
        // TODO: mocking으로는 어떻게 해야할까
        // {
        //   provide: getRepositoryToken(Channel),
        //   useClass: MockUserRepository,
        // },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    channelRepository = module.get<ChannelRepository>(ChannelRepository);
  });

  describe('채널 생성', () => {
    it('채널을 성공적으로 생성한다', async () => {
      const workspaceId = faker.datatype.number();
      const name = faker.lorem.word();
      const description = faker.lorem.sentence();

      const channelData: CreateChannelDto = {
        workspaceId,
        name,
        description,
        isPrivate: false,
      };

      const savedChannel = Channel.of({
        id: faker.datatype.number(),
        ...channelData,
      });

      const channelRepositorySaveSpy = jest
        .spyOn(channelRepository, 'save')
        .mockResolvedValue(savedChannel);

      const result = await service.createChannel(channelData);

      expect(channelRepositorySaveSpy).toBeCalledWith(channelData);
      expect(result).toEqual(savedChannel.id);
    });
  });

  describe('채널 목록 조회', () => {
    it('해당 Workspace내의 채널 목록을 불러온다.', async () => {
      const workspaceId = faker.datatype.number() % 3;
      const allChannelList = Array(10).map(() =>
        Channel.of({
          id: faker.datatype.number(),
          workspaceId: faker.datatype.number() % 3,
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
        }),
      );

      const workspaceChannelList = allChannelList.filter(
        (channel) => channel.workspaceId === workspaceId,
      );

      const channelRepositoryFindSpy = jest
        .spyOn(channelRepository, 'find')
        .mockResolvedValue(workspaceChannelList);

      const result = await service.getAllChannels(workspaceId);

      expect(channelRepositoryFindSpy).toBeCalledWith({ workspaceId });
      expect(result).toBe(workspaceChannelList);
    });
  });

  describe('채널 정보 수정', () => {
    it('존재하는 유저의 정보를 수정하려 할 때', async () => {
      const channelId = 2;
      // const channelId = faker.datatype.number();

      const updateChannelDto: UpdateChannelDto = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
      };

      const existingChannel = Channel.of({
        id: channelId,
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
      });

      const savedChannel = Channel.of({
        id: channelId,
        ...updateChannelDto,
      });

      const channelRepositoryFindOneSpy = jest
        .spyOn(channelRepository, 'findOne')
        .mockResolvedValue(existingChannel);

      const channelRepositorySaveSpy = jest
        .spyOn(channelRepository, 'save')
        .mockResolvedValue(savedChannel);

      const result = await service.updateChannel(channelId, updateChannelDto);

      expect(channelRepositoryFindOneSpy).toHaveBeenCalledWith(channelId);
      expect(channelRepositorySaveSpy).toHaveBeenCalledWith(savedChannel);
      expect(result).toEqual(savedChannel);
    });

    it('존재하지 않는 채널의 정보를 수정할 때 NotFoundError 에러 발생', async () => {
      const channelId = faker.datatype.number();

      const updateChannelDto: UpdateChannelDto = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
      };

      const channelRepositoryFindOneSpy = jest
        .spyOn(channelRepository, 'findOne')
        .mockResolvedValue(undefined);

      try {
        await service.updateChannel(channelId, updateChannelDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('There is no channel');
      }

      expect(channelRepositoryFindOneSpy).toBeCalledWith(channelId);
    });
  });

  // https://stackoverflow.com/questions/56644690/how-to-mock-chained-function-calls-using-jest
  describe('유저가 들어가 있는 채널 조회', () => {
    it('워크스페이스 안에서 해당 유저가 들어가 있는 채널 목록만 가져온다.', async () => {
      const workspaceId = faker.datatype.number();
      const userId = faker.datatype.number();
      const user = User.of({
        id: userId,
        name: faker.name.findName(),
        email: faker.internet.email(),
      });

      const allChannelList = Array(10).map(() =>
        Channel.of({
          id: faker.datatype.number(),
          workspaceId,
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          users: faker.datatype.number() % 2 ? [user] : [],
        }),
      );

      const userJoindChannelList = allChannelList.filter(
        (channel) => channel.users.filter((user) => user.id === userId).length,
      );

      const createQueryBuilder: any = {
        innerJoin: jest.fn().mockImplementation(() => createQueryBuilder),
        where: jest.fn().mockImplementation(() => createQueryBuilder),
        getMany: jest.fn().mockImplementation(() => userJoindChannelList),
      };

      jest
        .spyOn(channelRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      const result = await service.getJoinedChannel(userId, workspaceId);
      expect(result).toEqual(userJoindChannelList);
    });
  });
});
