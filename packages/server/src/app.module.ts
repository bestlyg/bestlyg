import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { MailerService } from './services';
import { schedules } from './schedules';
import { database, auth, application } from './modules';

const staticPath = join(__dirname, '../../../static');
// const publicPath = join(__dirname, '../../../public');
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../site/build'),
      serveRoot: '/site',
      serveStaticOptions: { immutable: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: staticPath,
      serveRoot: '/static',
      serveStaticOptions: { immutable: true },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: publicPath,
    //   serveRoot: '/public',
    // }),
    ScheduleModule.forRoot(),
    CacheModule.register(),
    // database.DatabaseModule,
    // auth.AuthModule,
    // application.ApplicationModule,
  ],
  controllers: [AppController],
  providers: [MailerService, ...schedules],
})
export class AppModule {}
