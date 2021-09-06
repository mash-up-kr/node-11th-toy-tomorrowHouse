import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  send_time: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.dms)
  workspace: Workspace;
}
