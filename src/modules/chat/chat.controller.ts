import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@ApiTags('Chat API')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: '채널 채팅 가져오기' })
  @Get()
  async getChatFromChannel(@Query('channelId') channelId: number) {
    return await this.chatService.getChatFromChannel(channelId);
  }

  @ApiOperation({ summary: '채널에 채팅 보내기' })
  @ApiBody({ type: CreateChatDto })
  @Post('')
  // async sendChat(@Body() chatData: CreateChatDto) { // 이 방법으로 할 시 오류
  async sendChat(
    @Body('userId') userId: number,
    @Body('channelId') channelId: number,
    @Body('content') content: string,
  ) {
    const chat = await this.chatService.sendChat({
      userId,
      channelId,
      content,
    });
    return chat;
  }

  @ApiParam({ name: 'chatId', required: true })
  @ApiBody({ type: UpdateChatDto })
  @ApiOperation({ summary: '채널에 보낸 채팅 수정하기' })
  @Patch('/:chatId')
  async updateChat(
    @Param('chatId') chatId: number,
    @Body('userId') userId: number,
    @Body('content') content: string,
    // @Body() chatData: UpdateChatDto,
  ) {
    const chat = await this.chatService.updateChat(chatId, { userId, content });
    return chat;
  }

  //TODO: swagger example body에 userId나오게 해야함
  @ApiParam({ name: 'chatId', required: true })
  @ApiBody({})
  @ApiOperation({ summary: '채널에 보낸 채팅 삭제' })
  @Delete('/:chatId')
  async deleteChat(
    @Param('chatId') chatId: number,
    @Body('userId') userId: number,
  ) {
    await this.chatService.deleteChat(chatId, userId);
  }
}
