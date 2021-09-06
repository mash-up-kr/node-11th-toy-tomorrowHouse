import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async getChatFromChannel(channelId: number): Promise<Array<Chat>> {
    const chats = await this.chatRepository.find({ channelId });
    return chats;
  }

  async sendChat(chatData: CreateChatDto) {
    await this.chatRepository.save(chatData);
  }

  async updateChat(chatId: number, chatData: UpdateChatDto) {
    const chat = await this.chatRepository.findOne(chatId);
    if (chat.userId === chatData.userId) {
      await this.chatRepository.update(chatId, { content: chatData.content });
    }
  }

  async deleteChat(chatId: number, userId: number) {
    const chat = await this.chatRepository.findOne(chatId);
    if (chat.userId === userId) {
      await this.chatRepository.remove(chat);
    }
  }
}
