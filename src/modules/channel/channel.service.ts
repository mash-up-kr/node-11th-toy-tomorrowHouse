import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
  ) {}

  async createChannel(channelData): Promise<number> {
    const channel = await this.channelRepository.save(channelData);
    return channel.id;
  }

  async getAllChannels(workspaceId): Promise<Array<Channel>> {
    const channels = await this.channelRepository.find({ workspaceId });
    return channels;
  }
}
