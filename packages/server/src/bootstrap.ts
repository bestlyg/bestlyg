import './swagger';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import fs from 'fs-extra';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { resolve, ZodValidationPipe } from '@bestlyg-server/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import { Configuration } from '@bestlyg/common/server';
import cookieParser from 'cookie-parser';

export async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    const configService = app.get(ConfigService);
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

    // const mode = configService.getOrThrow<Configuration['mode']>('mode');

    const config = new DocumentBuilder()
        .setTitle('Best Swagger')
        .setDescription('The best API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
        jsonDocumentUrl: 'swagger/json',
        yamlDocumentUrl: 'swagger/yaml',
        explorer: true,
        useGlobalPrefix: true,
        customSiteTitle: 'BestLyg Sever Swagger',
    });
    await fs.writeFile(resolve('openapi.json'), JSON.stringify(document, null, 4));

    const port = configService.getOrThrow<number>('server.port');
    await app.listen(port);
}
