import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { createChannelDto } from './dto/create-channel.dto';

@ApiTags('Channels API')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiResponse({ description: '채널 생성 성공' })
  @ApiOperation({ summary: '채널 생성' })
  @Post()
  async createChannel(@Body() channelData: createChannelDto) {
    const channelId = await this.channelService.createChannel(channelData);
    return { channelId };
  }

  @ApiOperation({ summary: '워크 스페이스 내 모든 채널 조회' })
  @Get()
  async getAllChannels(@Query('workspaceId') workspaceId: number) {
    const channels = await this.channelService.getAllChannels(workspaceId);
    return { list: channels };
  }
}
