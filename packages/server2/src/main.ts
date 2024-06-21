import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getHttpsOptions } from '@/utils';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: getHttpsOptions(),
  });
  app.setGlobalPrefix('/api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });
  await app.listen(80);
}
bootstrap();
