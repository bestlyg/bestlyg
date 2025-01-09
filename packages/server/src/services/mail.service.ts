import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    mailerTransporter: ReturnType<typeof nodeMailer.createTransport>;
    constructor(private configService: ConfigService) {
        const host = this.configService.get('mail.host');
        const user = this.configService.get('mail.user');
        const pass = this.configService.get('mail.pass');
        this.mailerTransporter = nodeMailer.createTransport({
            host: host,
            port: 587,
            secure: false,
            auth: {
                user: user,
                pass: pass,
            },
        });
    }
    async sendMail(emails: string[] = [], subject = '', html = '') {
        const user = this.configService.get('mail.user');
        const mailOptions = {
            from: `bestlyg<${user}>`,
            to: emails.join(','),
            subject,
            html,
        };
        return await this.mailerTransporter.sendMail(mailOptions);
    }
}
