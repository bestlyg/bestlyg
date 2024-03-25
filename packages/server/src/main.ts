import { RequestMethod } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import chokidar from 'chokidar';
import { $, fs } from 'zx';

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

// const sitePath = '/home/ubuntu/site.zip';
// chokidar.watch(sitePath).on('add', async (event, path) => {
//   console.log('ADD', event, path);
//   await $`sudo unzip -o -d /root/bestlyg /home/ubuntu/site.zip`;
//   await fs.remove(sitePath);
// });
