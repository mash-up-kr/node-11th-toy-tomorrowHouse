import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dm } from 'src/entities/dm.entity';
import { Workspace } from 'src/entities/workspace.entity';
import { DmController } from './dm.controller';
import { DmService } from './dm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dm, Workspace])],
  controllers: [DmController],
  providers: [DmService],
})
export class DmModule {}
