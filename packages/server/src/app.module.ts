import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { resolve } from './utils';
import { MailerService } from './services/mailer.service';
import { schedules } from './schedules';
import { server } from '@bestlyg/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(server.webPath),
      serveRoot: '/web',
      serveStaticOptions: { immutable: true },
    }),
    // ServeStaticModule.forRoot({
    //   // rootPath: resolve('node_modules', '@bestlyg', 'site', 'build'),
    //   rootPath: resolve(server.webPath, 'site'),
    //   serveRoot: '/site',
    //   serveStaticOptions: { immutable: true },
    // }),
    // ServeStaticModule.forRoot({
    //   // rootPath: resolve('node_modules', 'md2resume', 'dist'),
    //   rootPath: resolve(server.webPath, 'resume'),
    //   serveRoot: '/resume',
    //   serveStaticOptions: { immutable: true },
    // }),
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
