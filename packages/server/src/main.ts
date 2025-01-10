import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { getConfiguration } from './utils/index.js';
import { AllExceptionsFilter } from './filters/all-exceptions.filter.js';
import { LoggingInterceptor } from './interceptors/logging.interceptor.js';
import { prisma } from './utils/index.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: true,
        methods: '*',
        exposedHeaders: '*',
        credentials: true,
        maxAge: 86400,
    });
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    const configuration = getConfiguration();
    await app.listen(configuration.server.port);
}

bootstrap();
