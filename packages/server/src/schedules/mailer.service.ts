import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@/services';
import * as MarkdownIt from 'markdown-it';
import * as dayjs from 'dayjs';

const format = 'YYYY-MM-DD';

const menseHistory: string[] = [
  // injection
  '2023-3-14',
  // memse
  '2023-2-14',
  '2023-1-5',
  '2022-12-7',
  '2022-11-5',
  '2022-10-5',
  '2022-8-29',
  '2022-7-26',
  '2022-6-25',
  '2022-5-21',
  '2022-4-21',
  '2022-3-21',
  '2022-2-19',
  '2022-1-19',
];

@Injectable()
export class MailerTaskService {
  private md = new MarkdownIt();
  private menses = dayjs(menseHistory[0]);
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
    const mensesCnt = now.diff(this.menses, 'day');
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
          `1. 距离上一次大姨妈(${this.menses.format(
            format,
          )})已有${mensesCnt}天。`,
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
