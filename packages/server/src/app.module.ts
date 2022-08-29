import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppController2 } from './app.controller2';
import { AppService } from './app.service';
import { MailerService } from './services';
import { schedules } from './schedules';
import { MongooseModule } from '@nestjs/mongoose';
import { mongo } from '@/config';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/dist'),
      serveRoot: '/blog',
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(mongo.getUri('cats'), { connectionName: 'cats' }),
    CatsModule,
  ],
  controllers: [AppController, AppController2],
  providers: [MailerService, ...schedules, AppService],
})
export class AppModule {}
