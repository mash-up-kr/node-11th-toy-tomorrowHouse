import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'channel' })
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: '워크스페이스 ID',
  })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  workspaceId: number;

  @ApiProperty({
    example: '메쉬업 General',
    description: '채널 이름',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDatetime: string;

  @ApiProperty({
    example: false,
    description: '비밀 채널 여부',
  })
  @IsOptional()
  @Column()
  isPrivate: boolean;

  @ApiProperty({
    example: '메쉬업 모두가 얘기하는 공간',
    description: '채널 설명',
  })
  @IsString()
  @IsOptional()
  @Column()
  description: string;
}
