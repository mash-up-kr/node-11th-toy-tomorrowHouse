import { PickType } from '@nestjs/swagger';
import { Profile } from '../../../entities/profile.entity';

export class CreateProfileDto extends PickType(Profile, [
  'displayName',
  'imageUrl',
  'phoneNumber',
  'role',
] as const) {}
