import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';
import { Workspace } from './workspace.entity';

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

  @CreateDateColumn()
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

  @ManyToMany(() => User, (user) => user.channels, { cascade: true })
  @JoinTable({
    name: 'channel_member',
    joinColumn: {
      name: 'channelId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => Chat, (chat) => chat.channel, { cascade: true })
  chats: Chat[];

  @ManyToOne(() => Workspace, (workspace) => workspace.channels)
  workspace: Workspace;

  static of(params: Partial<Channel>): Channel {
    const channel = new Channel();

    Object.assign(channel, params);

    return channel;
  }
}
