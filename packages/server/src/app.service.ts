import { Injectable, Logger } from '@nestjs/common';
import { MailService } from './services/mail.service.js';

@Injectable()
export class AppService {
    private logger = new Logger(AppService.name);
    constructor(private mailService: MailService) {}
    getHello(): string {
        return 'Hello World!';
    }
    onApplicationBootstrap() {
        this.sendMailWhenStartSuccess();
    }

    sendMailWhenStartSuccess() {
        const bestEnv = Object.entries(process.env).filter(([k]) => k.startsWith('BESTLYG'));
        for (const [k, v] of bestEnv) {
            this.logger.log(`${k}: ${v}`);
        }
        this.mailService.sendMail(
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
