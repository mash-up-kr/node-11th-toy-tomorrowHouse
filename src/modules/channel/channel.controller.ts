import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Channel } from 'src/entities/channel.entity';
import { ChannelService } from './channel.service';
import { createChannelDto } from './dto/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiResponse({ status: 200, description: '채널 생성 성공' })
  @ApiOperation({ summary: '채널 생성' })
  @Post()
  async createChannel(@Body() channelData: createChannelDto) {
    const channel = await this.channelService.createChannel(channelData);
    return { channelId: channel.id };
  }
}
