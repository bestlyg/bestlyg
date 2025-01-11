import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { ApiController } from './controllers/api.controller.js';
import { StaticController } from './controllers/static.controller.js';
import { AppService } from './app.service.js';
import { resolve, getConfiguration } from './utils/index.js';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { server } from '@bestlyg/config';
import { TasksService } from './services/tasks.service.js';
import { AuthModule } from './modules/auth/index.js';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from './services/mail.service.js';
import { ServerlessModule } from './modules/serverless/index.js';
import { DataModule } from './modules/data/index.js';

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
        DataModule,
        AuthModule,
        ServerlessModule,
    ],
    controllers: [AppController, ApiController, StaticController],
    providers: [AppService, TasksService, MailService],
})
export class AppModule {}
