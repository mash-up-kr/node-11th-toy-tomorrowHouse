import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDatatime: Date;

  @UpdateDateColumn()
  updateDatetime: Date;

  @ApiProperty({
    example: '테스트 메세지',
    description: '유저가 채널에 보낸 메세지',
  })
  @Column()
  content: string;

  @ApiProperty({
    example: 1,
    description: '채널 id',
  })
  @Column()
  channelId: number;

  @ApiProperty({
    example: 1,
    description: '유저 id',
  })
  @Column()
  userId: number;

  @ManyToOne(() => Channel, (channel) => channel.chats)
  channel: Channel;

  @ManyToOne(() => User, (user) => user.chats)
  user: User;
}
