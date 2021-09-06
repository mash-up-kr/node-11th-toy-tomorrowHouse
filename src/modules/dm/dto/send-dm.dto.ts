import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendDmDto {
  @IsNumber()
  @IsNotEmpty()
  user_from_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_to_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  send_time: Date;
}
