import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConfiguration, MailService } from '@bestlyg-server/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { server } from '@bestlyg/config';
import { TasksService } from './services/tasks.service';
import { AuthModule } from '@bestlyg-server/auth';
import { JwtModule } from '@nestjs/jwt';
import { ServerlessModule } from '@bestlyg-server/serverless';
import { DataModule } from '@bestlyg-server/data';
import { StaticModule } from '@bestlyg-server/static';
import { ApiModule } from '@bestlyg-server/api';

const configuration = getConfiguration();

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            // envFilePath: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
            ignoreEnvFile: true,
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
        StaticModule,
        ApiModule,
    ],
    controllers: [AppController],
    providers: [AppService, TasksService, MailService],
})
export class AppModule {}
