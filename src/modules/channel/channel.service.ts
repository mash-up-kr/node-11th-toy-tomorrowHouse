import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
  ) {}
  async createChannel(channelData): Promise<Channel> {
    const channel = await this.channelRepository.save(channelData);
    console.log(channel);
    return channel;
  }
}
