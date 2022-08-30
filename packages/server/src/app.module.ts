import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerService } from './services';
import { schedules } from './schedules';
import { GangModule } from './modules';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/dist'),
      serveRoot: '/blog',
    }),
    ScheduleModule.forRoot(),
    GangModule,
  ],
  controllers: [AppController],
  providers: [MailerService, ...schedules, AppService],
})
export class AppModule {}
