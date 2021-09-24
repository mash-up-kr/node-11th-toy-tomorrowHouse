import { Injectable, NotFoundException } from '@nestjs/common';
import { Channel } from 'src/entities/channel.entity';
import { UserRepository } from '../user/use.repository';
import { ChannelRepository } from './channel.repository';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createChannel(channelData: CreateChannelDto): Promise<number> {
    const channel = await this.channelRepository.save(channelData);
    return channel.id;
  }

  async getAllChannels(workspaceId: number): Promise<Array<Channel>> {
    const channels = await this.channelRepository.find({ workspaceId });
    return channels;
  }

  async updateChannel(
    channelId: number,
    updateData: UpdateChannelDto,
  ): Promise<Channel> {
    const channel = await this.channelRepository.findOne(channelId);

    if (!channel) {
      throw new NotFoundException('There is no channel');
    }

    const updatedChannel = { ...channel, ...updateData };
    return await this.channelRepository.save(updatedChannel);
  }

  async getJoinedChannel(userId: number, workspaceId: number) {
    // #1
    const channels = await this.channelRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.users', 'user', 'user.id = :userId', {
        userId,
      })
      .where({ workspaceId })
      .getMany();

    // #2
    // const user = await this.userRepository.findOne(userId, {
    //   relations: ['channels'],
    // });
    // const channels = user.channels.filter(
    //   (channel) => channel.workspaceId === workspaceId,
    // );

    return channels;
  }
}
