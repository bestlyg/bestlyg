import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ApiController } from './controllers/api.controller';
import { StaticController } from './controllers/static.controller';
import { AppService } from './app.service';
import { resolve, getConfiguration } from './utils/index';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { server } from '@bestlyg/config';
import { TasksService } from './services/tasks.service';
import { AuthModule } from './modules/auth/index';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from './services/mail.service';
import { ServerlessModule } from './modules/serverless/index';

const configuration = getConfiguration();

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
            isGlobal: true,
            load: [getConfiguration],
        }),
        ServeStaticModule.forRoot({
            rootPath: server.webPath,
            serveRoot: '/web',
        }),
        JwtModule.register({
            global: true,
            secret: configuration.jwt.secret,
            signOptions: { expiresIn: '100 days' },
        }),
        AuthModule,
        ServerlessModule,
    ],
    controllers: [AppController, ApiController, StaticController],
    providers: [AppService, TasksService, MailService],
})
export class AppModule {}
