import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MorganModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_INTERCEPTOR,
    useClass: MorganInterceptor('combined'),
  }],
})
export class AppModule {}
