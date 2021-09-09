import { PickType } from '@nestjs/swagger';
import { Channel } from 'src/entities/channel.entity';

export class CreateChannelDto extends PickType(Channel, [
  'workspaceId',
  'name',
  'description',
  'isPrivate',
] as const) {}
