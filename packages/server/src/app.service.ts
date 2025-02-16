import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@bestlyg-server/common';
import { Configuration } from '@bestlyg/common/server';

@Injectable()
export class AppService implements OnApplicationBootstrap {
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
        const bestEnv = Object.entries(process.env).filter(([k]) => k.startsWith('BESTLYG'));
        for (const [k, v] of bestEnv) {
            this.logger.log(`${k}: ${v}`);
        }
        if (mode === 'production') {
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
