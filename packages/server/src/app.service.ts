import { Injectable, Logger } from '@nestjs/common';
import { MailService } from './services/mail.service.js';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './utils/index.js';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);
    constructor(
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
    ) {}
    getHello(): string {
        return 'Hello World!';
    }
    onApplicationBootstrap() {
        this.sendMailWhenStartSuccess();
    }

    sendMailWhenStartSuccess() {
        const mode = this.configService.get<Configuration['mode']>('mode');
        this.logger.log(`mode = ${mode}`);
        if (mode === 'production') {
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
}