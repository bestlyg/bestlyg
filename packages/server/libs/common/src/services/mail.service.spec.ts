import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { expect, it } from '@rstest/core';
import { MailService } from './mail.service';

it('preserves mail fields with Nodemailer 10 without connecting to SMTP', async () => {
    const service = new MailService(
        new ConfigService({
            mail: { host: 'localhost', user: 'sender@example.test', pass: 'test-only' },
        }),
    );
    service.mailerTransporter = createTransport({ jsonTransport: true });
    const result = await service.sendMail(
        ['first@example.test', 'second@example.test'],
        '中文标题',
        '<p>Hello</p>',
    );
    const message = JSON.parse(String(result.message));
    expect(message.from).toEqual({ name: 'bestlyg', address: 'sender@example.test' });
    expect(message.to.map((recipient: { address: string }) => recipient.address)).toEqual([
        'first@example.test',
        'second@example.test',
    ]);
    expect(message.subject).toBe('中文标题');
    expect(message.html).toBe('<p>Hello</p>');
});
