import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestlygConfig, MailService, resolve } from '@bestlyg-server/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getConfiguration, ConfigurationSchema } from '@bestlyg/common/server';
import { TasksService } from './services/tasks.service';
import dotenv from 'dotenv';
import { AuthModule } from '@bestlyg-server/auth';
import { JwtModule } from '@nestjs/jwt';
import { ServerlessModule } from '@bestlyg-server/serverless';
// import { DataModule } from '@bestlyg-server/data';
import { StaticModule } from '@bestlyg-server/static';
// import { ApiModule } from '@bestlyg-server/api';
import { ZjuerModule } from '@bestlyg-server/zjuer';
import { DatabaseModule, entities } from '@bestlyg-server/database';
import { ApiModule } from '@bestlyg-server/api';

// dotenv.config({ path: resolve('node_modules', '@bestlyg', 'common', '.env') });
// const configuration = ConfigurationSchema.parse(getConfiguration());

export class AppModule {
    static forRoot({ config }: { config: BestlygConfig }) {
        return {
            module: AppModule,
            imports: [
                ScheduleModule.forRoot(),
                // ConfigModule.forRoot({
                //     // envFilePath: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
                //     ignoreEnvFile: true,
                //     isGlobal: true,
                //     load: [() => ConfigurationSchema.parse(getConfiguration())],
                // }),
                ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [() => config] }),
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    retryAttempts: 3,
                    retryDelay: 3000,
                    entities: Object.values(entities),
                    url: config.server.database.url,
                    synchronize: true,
                    logging: true,
                }),
                ServeStaticModule.forRoot({
                    rootPath: config.ssh.webPath,
                    serveRoot: '/web',
                }),
                ServeStaticModule.forRoot({
                    rootPath: resolve('node_modules', '@bestlyg', 'client', 'dist'),
                }),
                JwtModule.register({
                    global: true,
                    secret: config.jwt.secret,
                    signOptions: { expiresIn: '100 days' },
                }),
                ClsModule.forRoot({
                    global: true,
                    middleware: {
                        mount: true,
                        setup: (cls, req) => {
                            cls.set('info', req.headers['x-info']);
                        },
                    },
                }),
                DatabaseModule,
                AuthModule,
                ServerlessModule,
                StaticModule,
                ApiModule,
                ZjuerModule,
            ],
            controllers: [AppController],
            providers: [AppService, TasksService, MailService],
        };
    }
}
