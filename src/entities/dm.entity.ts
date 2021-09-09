import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity()
export class Dm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_from_id: number;

  @Column()
  user_to_id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  sent_time: Date;

  @UpdateDateColumn()
  updated_time: Date;

  @DeleteDateColumn()
  deleted_time?: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.dms)
  workspace: Workspace;
}
