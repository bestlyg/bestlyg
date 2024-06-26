import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getHttpsOptions, resolve } from '@/utils';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import { RequestMethod } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  console.log('bootstrap', resolve());
  dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
  });
  const httpsOptions = getHttpsOptions();
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
  http.createServer(server).listen(80);
  if (httpsOptions) {
    https.createServer(httpsOptions, server).listen(443);
  }
}
bootstrap().catch((err) => {
  console.log('Find Error');
  console.error(err);
});
