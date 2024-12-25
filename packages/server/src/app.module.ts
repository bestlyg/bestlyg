import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { ApiController } from './controllers/api.controller.js';
import { StaticController } from './controllers/static.controller.js';
import { AuthController } from './controllers/auth.controller.js';
import { AppService } from './app.service.js';
import { JwtModule } from '@nestjs/jwt';
import { resolve, SECRET } from './utils/index.js';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { server } from '@bestlyg/config';
import { TasksService } from './services/tasks.service.js';
import { AuthService } from './services/auth.service.js';
import { AuthGuard } from './guards/auth.guard.js';

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
        JwtModule.register({
            global: true,
            secret: SECRET,
            signOptions: { expiresIn: '100 days' },
        }),
    ],
    controllers: [AppController, ApiController, StaticController, AuthController],
    providers: [AppService, TasksService, AuthService, AuthGuard],
})
export class AppModule {}
