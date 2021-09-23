import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { Channel } from 'src/entities/channel.entity';
import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../user/use.repository';
import { NotFoundException } from '@nestjs/common';

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
});
