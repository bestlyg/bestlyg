import { RequestMethod } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import chokidar from 'chokidar';
import { execSync } from 'node:child_process';
import fs from 'fs-extra';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(50000);
}
bootstrap();

const sitePath = '/home/ubuntu/site.zip';
chokidar.watch(sitePath).on('*', async (event, path) => {
  console.log('watch', event, path);
  // execSync(`sudo unzip -o -d /root/bestlyg ${sitePath}`);
  // await fs.remove(sitePath);
});
