import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {}

  async createChannel(channelData: CreateChannelDto): Promise<number> {
    const channel = await this.channelRepository.save(channelData);
    return channel.id;
  }

  async getAllChannels(workspaceId: number): Promise<Array<Channel>> {
    const channels = await this.channelRepository.find({ workspaceId });
    return channels;
  }

  async updateChannel(id: number, updateData: UpdateChannelDto): Promise<void> {
    await this.channelRepository.update(id, updateData);
  }
}
