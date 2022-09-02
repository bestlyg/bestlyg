import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { MailerService } from './services';
import { schedules } from './schedules';
import { database, auth } from './modules';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../blog/dist'),
      serveRoot: '/blog',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './static'),
      serveRoot: '/static',
    }),
    ScheduleModule.forRoot(),
    CacheModule.register(),
    database.DatabaseModule,
    auth.AuthModule,
  ],
  controllers: [AppController],
  providers: [MailerService, ...schedules],
})
export class AppModule {}
