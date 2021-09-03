import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  // @OneToMany((type)=>Channel, (channel)=>channel.workspace, {cascade:true})
  // channels: Channel[];
}
