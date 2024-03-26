import { RequestMethod } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import * as chokidar from 'chokidar';
import { execSync } from 'node:child_process';
import { debounce } from 'lodash';

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
const deploySite = debounce(
  () => execSync(`unzip -o -d /root/bestlyg ${sitePath}`),
  1000,
);
chokidar.watch(sitePath, { persistent: true }).on('all', async (event) => {
  switch (event) {
    case 'add':
    case 'change':
      deploySite();
    default:
      return;
  }
});
