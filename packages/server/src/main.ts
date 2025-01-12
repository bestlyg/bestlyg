import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@bestlyg-server/common';


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

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const configService = app.get(ConfigService);
    const port = configService.get('server.port');
    await app.listen(port);
}

bootstrap();
