import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PORT } from './utils/constants.js';
import { sendMail } from './utils/mailer.js';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    sendMailWhenStartSuccess();
    await app.listen(PORT);

    function sendMailWhenStartSuccess() {
        const logger = new Logger('BestEnv');
        const bestEnv = Object.entries(process.env).filter(([k]) => k.startsWith('BESTLYG'));
        for (const [k, v] of bestEnv) {
            logger.log(`${k}: ${v}`);
        }
        sendMail(
            ['1057966749@qq.com'],
            `服务启动通知`,
            `
    <h1>PROCESS.ENV</h1>
    ${bestEnv
        .map(([k, v]) => `${k.padEnd(10)} : ${v}`)
        .map(item => `<div>${item}</div>`)
        .join('\n')}
    `.trim(),
        );
    }
}

bootstrap();
