import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Chat } from './chat.entity';

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

  @Column({ default: 'User', length: 10 })
  displayed_name: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chat: Chat[];
}
