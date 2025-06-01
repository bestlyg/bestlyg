import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailService, resolve } from '@bestlyg-server/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getConfiguration, ConfigurationSchema } from '@bestlyg/common/server';
import { TasksService } from './services/tasks.service';
import dotenv from 'dotenv';
import { AuthModule } from '@bestlyg-server/auth';
import { JwtModule } from '@nestjs/jwt';
import { ServerlessModule } from '@bestlyg-server/serverless';
import { DataModule } from '@bestlyg-server/data';
import { StaticModule } from '@bestlyg-server/static';
import { ApiModule } from '@bestlyg-server/api';
import { ZjuerModule } from '@bestlyg-server/zjuer';

dotenv.config({ path: resolve('node_modules', '@bestlyg', 'common', '.env') });
const configuration = ConfigurationSchema.parse(getConfiguration());
const cls = ClsModule.forRoot({
    global: true,
    middleware: {
        mount: true,
        setup: (cls, req) => {
            cls.set('info', req.headers['x-info']);
        },
    },
});
cls.global = true;
@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            // envFilePath: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
            ignoreEnvFile: true,
            isGlobal: true,
            load: [() => ConfigurationSchema.parse(getConfiguration())],
        }),
        ServeStaticModule.forRoot({
            rootPath: configuration.ssh.webPath,
            serveRoot: '/web',
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve('node_modules', '@bestlyg', 'client', 'dist'),
        }),
        JwtModule.register({
            global: true,
            secret: configuration.jwt.secret,
            signOptions: { expiresIn: '100 days' },
        }),
        cls,
        DataModule,
        AuthModule,
        ServerlessModule,
        StaticModule,
        ApiModule,
        ZjuerModule,
    ],
    controllers: [AppController],
    providers: [AppService, TasksService, MailService],
})
export class AppModule {}
