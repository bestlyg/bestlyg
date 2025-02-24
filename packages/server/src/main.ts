import { HttpAdapterHost, NestContainer, NestFactory } from '@nestjs/core';
import fs from 'fs-extra';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { PrismaService, resolve } from '@bestlyg-server/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import * as idl from '@bestlyg/common/idl/server';
import cookieParser from 'cookie-parser';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

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
    app.setGlobalPrefix('/api', {
        exclude: [
            idl.api.bestlyg.ClientService.GetDocsSidebars.url,
            idl.api.bestlyg.ClientService.GetLeetcodeSidebars.url,
            '/static',
        ],
    });
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const config = new DocumentBuilder()
        .setTitle('Best Swagger')
        .setDescription('The best API description')
        .setVersion('1.0')
        .build();
    patchNestjsSwagger(); // <--- This is the hacky patch using prototypes (for now)
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
        jsonDocumentUrl: 'swagger/json',
        yamlDocumentUrl: 'swagger/yaml',
        explorer: true,
        useGlobalPrefix: true,
    });
    await fs.writeFile(resolve('openapi.json'), JSON.stringify(document, null, 4));

    const configService = app.get(ConfigService);
    const port = configService.get('server.port');
    await app.listen(port);
}

bootstrap();
