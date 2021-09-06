import { PickType } from '@nestjs/swagger';
import { SendDmDto } from './send-dm.dto';

export class UpdateDmDto extends PickType(SendDmDto, ['content'] as const) {}
