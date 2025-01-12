import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { PrismaService, ZodValidationPipe } from '@bestlyg-server/common';
import compression from 'compression';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    app.use(compression());
    app.use(cookieParser());
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
    app.useGlobalPipes(new ZodValidationPipe());

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const configService = app.get(ConfigService);
    const port = configService.get('server.port');
    await app.listen(port);
}

bootstrap();
