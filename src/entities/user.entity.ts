import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { Chat } from './chat.entity';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true, default: null })
  profileId: number;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @ManyToMany(() => Channel, (channel) => channel.users)
  channels: Channel[];

  @OneToOne(() => Profile, {
    cascade: true,
  })
  @JoinColumn([{ name: 'profileId', referencedColumnName: 'id' }])
  profile: Profile;
  static of(params: Partial<User>): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }
}
