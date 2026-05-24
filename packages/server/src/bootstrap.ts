import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { createLoggerOptions, loadBestlygConfig, ZodValidationPipe } from '@bestlyg-server/common';
import compression from 'compression';
import { WinstonModule } from 'nest-winston';
import cookieParser from 'cookie-parser';
import 'winston-daily-rotate-file';

export async function bootstrap() {
    const bestlygConfig = await loadBestlygConfig();
    const app = await NestFactory.create(AppModule.forRoot({ config: bestlygConfig }), {});
    app.useLogger(WinstonModule.createLogger(createLoggerOptions()));
    // const configService = app.get(ConfigService);
    app.use(compression());
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        methods: '*',
        exposedHeaders: '*',
        credentials: true,
        maxAge: 86400,
    });
    app.setGlobalPrefix('/api', {
        exclude: ['/static', '/zjuer/wiki'],
    });
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(new ZodValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    await app.listen(bestlygConfig.server.port);
}
