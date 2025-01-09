import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { getConfiguration } from './utils/index.js';
import { AllExceptionsFilter } from './filters/all-exceptions.filter.js';
import { LoggingInterceptor } from './interceptors/logging.interceptor.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    const configuration = getConfiguration();
    await app.listen(configuration.server.port);
}

bootstrap();
