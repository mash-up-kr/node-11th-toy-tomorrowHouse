import { ArrayMaxSize, IsArray, IsNotEmpty } from 'class-validator';

export class InviteUsersDto {
  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(1000)
  readonly userIDs: number[];
}
