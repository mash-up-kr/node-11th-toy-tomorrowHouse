import { PickType } from '@nestjs/swagger';
import { Chat } from 'src/entities/chat.entity';

export class UpdateChatDto extends PickType(Chat, [
  'userId',
  'content',
] as const) {}
