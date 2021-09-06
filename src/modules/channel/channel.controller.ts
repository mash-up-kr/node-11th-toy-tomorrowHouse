import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@ApiTags('Channels API')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {
    console.log(CreateChannelDto);
  }

  @ApiResponse({ description: '채널 생성 성공' })
  @ApiOperation({ summary: '채널 생성' })
  @Post()
  async createChannel(@Body() channelData: CreateChannelDto) {
    const channelId = await this.channelService.createChannel(channelData);
    return { channelId };
  }

  @ApiOperation({ summary: '워크 스페이스 내 모든 채널 조회' })
  @Get()
  async getAllChannels(@Query('workspaceId') workspaceId: number) {
    const channels = await this.channelService.getAllChannels(workspaceId);
    return { list: channels };
  }

  @ApiParam({ name: 'channelId' })
  @ApiOperation({ summary: '채널 정보 수정' })
  @Patch('/:channelId')
  async updateChannel(
    @Param('channelId') channelId,
    @Body() channelData: UpdateChannelDto,
  ) {
    await this.channelService.updateChannel(channelId, channelData);
  }
}
