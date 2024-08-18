import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';

const mailer = {
    host: 'smtp.qq.com',
    user: '1057966749@qq.com',
    pass: btoa('uì±Ê\x19äÊùpm÷^'),
};

@Injectable()
export class MailerService {
    private transporter = nodeMailer.createTransport({
        host: mailer.host,
        port: 587,
        secure: false,
        auth: {
            user: mailer.user,
            pass: mailer.pass,
        },
    });
    async send(emails: string[] = [], subject = '', html = '') {
        const mailOptions = {
            from: `bestlyg<${mailer.user}>`,
            to: emails.join(','),
            subject,
            html,
        };
        return await this.transporter.sendMail(mailOptions);
    }
}
