import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @ApiProperty({
    example: 1,
    description: '프로필 아이디',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '멋쟁이 개발자',
    description: '다른 사람들에게 보여주는 이름. 닉네임 같은거~',
  })
  @Column()
  @IsString()
  displayName: string;

  // 이거는 임시적인 거임 s3에 올라간 url
  @ApiProperty({
    description: '이미지 url',
  })
  @Column({ default: null })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    example: '개발자',
    description: '속한 워크스페이스에서의 역할',
  })
  @IsString()
  @IsOptional()
  @Column({ default: null })
  role: string;

  @ApiProperty({
    example: '010-0000-0000',
    description: '폰 번호',
  })
  @Column({ default: null })
  @IsString()
  @IsOptional()
  phoneNumber: string;
}
