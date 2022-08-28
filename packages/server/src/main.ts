import { RequestMethod } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  await app.listen(50000);
}
bootstrap();
