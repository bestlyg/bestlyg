import { Controller, Get, Redirect } from '@nestjs/common';
import { MailerService } from './services/mailer.service';

@Controller()
export class AppController {
  constructor(private readonly mailer: MailerService) {
    this.mailer.send(
      ['1057966749@qq.com'],
      `服务启动通知`,
      `
<div>====> ENV</div>
${Object.entries(process.env)
  .map(([k, v]) => `${k.padEnd(10)} : ${v}`)
  .map((item) => `<div>${item}</div>`)
  .join('\n')}
`,
    );
  }
  @Get()
  @Redirect('/site')
  async index() {
    return Promise.resolve();
  }
}
