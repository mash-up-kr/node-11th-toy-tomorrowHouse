import { PartialType } from '@nestjs/swagger';
import { Channel } from 'src/entities/channel.entity';

export class UpdateChannelDto extends PartialType(Channel) {}
