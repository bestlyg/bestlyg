import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { resolve } from './utils';
import { MailerService } from './services/mailer.service';
import { schedules } from './schedules';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.env.BESTLYG_WEB_PATH ?? resolve('web'),
      serveRoot: '/web',
      serveStaticOptions: { immutable: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve('..', '..', 'static'),
      serveRoot: '/static',
      serveStaticOptions: { immutable: true },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [MailerService, ...schedules],
})
export class AppModule {}
