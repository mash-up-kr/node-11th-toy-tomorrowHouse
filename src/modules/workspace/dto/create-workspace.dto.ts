import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  readonly name: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(1000)
  readonly userIDs: number[];

  // @IsInt({each: true})
  // readonly channels: Channel[];
}
