import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dm } from './dm.entity';
import { Channel } from './channel.entity';
import { User } from './user.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable()
  users: User[];

  @OneToMany(() => Dm, (dm) => dm.workspace, {
    cascade: true,
  })
  dms: Dm[];
  
  @OneToMany(() => Channel, (channel) => channel.workspace, { cascade: true })
  channels: Channel[];
}
