import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getHttpsOptions, resolve, startWatchSiteZip } from '@/utils';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  console.log('bootstrap', resolve());
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
startWatchSiteZip();
bootstrap();
