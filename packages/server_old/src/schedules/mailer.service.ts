import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@/services';
import * as MarkdownIt from 'markdown-it';
import * as dayjs from 'dayjs';

@Injectable()
export class MailerTaskService {
  private md = new MarkdownIt();
  constructor(private readonly mailer: MailerService) {}

  async lyg_mailerTask(name: string, content: string) {
    await this.mailer.send(['1057966749@qq.com'], `定时提醒-${name}`, content);
  }
  async yzx_mailerTask(name: string, content: string) {
    await this.mailer.send(['2428047022@qq.com'], `定时提醒-${name}`, content);
  }
  @Cron('0 0 8,20 * * *')
  async ownerDaily() {
    const now = dayjs();
    const subject = `${dayjs().format('YYYY-MM-DD')}日报`;
    await this.lyg_mailerTask(
      subject,
      this.md.render(
        [
          `# 日报`,
          ``,
          `> 这是一份专属的每日日报  `,
          `> 记录每日应该要记得的事  `,
          ``,
          `1. 距离2018年1月1日已有${now.diff('2018-1-1', 'day')}天。`,
          `1. 建行生活签到。`,
          `1. 腾信视频签到。`,
          `1. 拼多多每周5元无门槛领取。`,
          `1. LeetCode每日一题。`,
          `1. Arcaea每日能量。`,
          `1. 扇贝英语每日打卡。`,
          `1. 番茄小说每日签到。`,
        ].join('\n'),
      ),
    );
  }
  @Cron('0 55 9 * * 3')
  async coupon3() {
    this.yzx_mailerTask('抢劵', '抢劵');
  }
  @Cron('0 55 10 * * 5')
  async coupon5() {
    this.yzx_mailerTask('抢劵', '抢劵');
  }
  @Cron('0 30 7 * * *')
  async daily() {
    this.yzx_mailerTask(
      '建行/番茄/支付宝小鸡/淘金币',
      '建行/番茄/支付宝小鸡/淘金币',
    );
  }
  @Cron('0 0 22 * * *')
  async medicine() {
    this.yzx_mailerTask('吃药', '吃药');
  }
}