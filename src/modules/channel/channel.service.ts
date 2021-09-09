import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
  ): Promise<void> {
    await this.channelRepository.update(channelId, updateData);
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
