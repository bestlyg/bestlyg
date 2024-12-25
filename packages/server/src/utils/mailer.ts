import * as nodeMailer from 'nodemailer';
import { MAIL_HOST, MAIL_USER, MAIL_PASS } from './constants.js';

export const mailerTransporter = nodeMailer.createTransport({
    host: MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
});

export async function sendMail(emails: string[] = [], subject = '', html = '') {
    const mailOptions = {
        from: `bestlyg<${MAIL_USER}>`,
        to: emails.join(','),
        subject,
        html,
    };
    return await mailerTransporter.sendMail(mailOptions);
}
