import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  @IsOptional()
  imageUrl: string;

  @Column()
  @IsOptional()
  role: string;

  @Column()
  @IsOptional()
  phoneNumber: string;
}
