import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../user/use.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelRepository, UserRepository])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
