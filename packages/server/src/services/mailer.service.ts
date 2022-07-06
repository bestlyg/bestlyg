import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';

const config = {
  host: 'smtp.qq.com',
  user: '1057966749@qq.com',
  pass: 'deyxyhnkyvlwbfde',
};

@Injectable()
export class MailerService {
  private transporter = nodeMailer.createTransport({
    host: config.host,
    port: 587,
    secure: false,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
  async send(emails: string[] = [], subject = '', html = '') {
    const mailOptions = {
      from: `bestlyg<${config.user}>`,
      to: emails.join(','),
      subject,
      html,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
