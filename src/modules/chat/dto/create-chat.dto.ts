import { PickType } from '@nestjs/swagger';
import { Chat } from 'src/entities/chat.entity';

export class CreateChatDto extends PickType(Chat, [
  'content',
  'userId',
  'channelId',
] as const) {}
