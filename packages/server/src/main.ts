import { RequestMethod } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import * as chokidar from 'chokidar';
import { execSync } from 'node:child_process';

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
let timeout: NodeJS.Timeout = null;
function deploySite() {
  execSync(`unzip -o -d /root/bestlyg ${sitePath}`);
}
chokidar.watch(sitePath, { persistent: true }).on('all', async (event) => {
  switch (event) {
    case 'add':
    case 'change':
      if (timeout) clearTimeout(timeout);
      setTimeout(() => {
        deploySite();
        timeout = null;
      }, 1000);
    default:
      return;
  }
});
