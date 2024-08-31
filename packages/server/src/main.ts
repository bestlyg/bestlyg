import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve } from '@/utils';
import * as express from 'express';
import * as http from 'http';
import { RequestMethod } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
    console.log('bootstrap', resolve());
    dotenv.config({
        path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
    });
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('/api', {
        exclude: [
            {
                path: '/',
                method: RequestMethod.GET,
            },
        ],
    });
    await app.init();
    http.createServer(server).listen(10000);
}
bootstrap().catch(err => {
    console.log('Find Error');
    console.error(err);
});
