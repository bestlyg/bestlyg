import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { ApiController } from './controllers/api.controller.js';
import { StaticController } from './controllers/static.controller.js';
import { AppService } from './app.service.js';
import { resolve } from './utils/index.js';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { server } from '@bestlyg/config';
import { TasksService } from './services/tasks.service.js';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
        }),
        ServeStaticModule.forRoot({
            rootPath: server.webPath,
            serveRoot: '/web',
        }),
    ],
    controllers: [AppController, ApiController, StaticController],
    providers: [AppService, TasksService],
})
export class AppModule {}
