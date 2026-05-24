import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestlygConfig, GlobalModule, resolve } from '@bestlyg-server/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TasksService } from './services/tasks.service';
import { AuthModule } from '@bestlyg-server/auth';
import { ServerlessModule } from '@bestlyg-server/serverless';
// import { DataModule } from '@bestlyg-server/data';
import { StaticModule } from '@bestlyg-server/static';
// import { ApiModule } from '@bestlyg-server/api';
import { ZjuerModule } from '@bestlyg-server/zjuer';
import { DatabaseModule, entities } from '@bestlyg-server/database';
import { ApiModule } from '@bestlyg-server/api';
import { SystemModule } from './modules';

// const configuration = ConfigurationSchema.parse(getConfiguration());

export class AppModule {
    static forRoot({ config }: { config: BestlygConfig }) {
        return {
            module: AppModule,
            imports: [
                GlobalModule.forRoot({ config }),
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    retryAttempts: 3,
                    retryDelay: 3000,
                    entities: Object.values(entities),
                    url: config.server.database.url,
                    synchronize: config.server.database.synchronize,
                    logging: true,
                }),
                ServeStaticModule.forRoot({
                    rootPath: config.ssh.webPath,
                    serveRoot: '/web',
                }),
                ServeStaticModule.forRoot({
                    rootPath: resolve('node_modules', '@bestlyg', 'client', 'dist'),
                }),
                SystemModule.forRoot({ config }),
                DatabaseModule,
                AuthModule,
                ServerlessModule,
                StaticModule,
                ApiModule,
                ZjuerModule,
            ],
            controllers: [AppController],
            providers: [AppService, TasksService],
        };
    }
}
