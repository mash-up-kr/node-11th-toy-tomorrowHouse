import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  readonly name: string;
}
