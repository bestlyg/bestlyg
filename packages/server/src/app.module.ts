import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppController2 } from './app.controller2';
import { AppService } from './app.service';
import { MailerService } from './services';
import { schedules } from './schedules';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/dist'),
      serveRoot: '/blog',
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, AppController2],
  providers: [AppService, MailerService, ...schedules],
})
export class AppModule {}
