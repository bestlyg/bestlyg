import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@/services';
import * as MarkdownIt from 'markdown-it';
import * as dayjs from 'dayjs';

const format = 'YYYY-MM-DD';

const menseHistory: string[] = [
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
  @Cron('0 30 20 * * *')
  async ownerXXYX() {
    await this.lyg_mailerTask('定时提醒-晓晓优选', '晓晓优选记得提交');
  }
  //交行抢5折券 每周五提醒
  @Cron('0 55 9 * * *')
  async yzx_jh() {
    if (dayjs().day() !== 5) return;
    await this.yzx_mailerTask('10点钟交行抢5折券', '10点钟交行抢5折券');
  }
  // 建行生活 每日
  @Cron('0 0 12 * * *')
  async yzx_jhsh() {
    await this.yzx_mailerTask('建行生活', '建行生活记得签到');
    await this.lyg_mailerTask('建行生活', '建行生活记得签到');
  }
  // 每日大姨妈提醒
  @Cron('0 0 22 * * *')
  async yzx_menses() {
    const format = 'YYYY-MM-DD';
    const date_now = dayjs();
    const cnt = date_now.diff(this.menses, 'day');
    const set = new Set([21, 24, 28]);
    if (set.has(cnt)) {
      await this.yzx_mailerTask(
        '大姨妈提醒',
        `距离上一次大姨妈(${this.menses.format(format)})已有${cnt}天。`,
      );
    }
  }
  // 腾讯视频 每个月1号早上8点
  @Cron('0 0 8 1 * *')
  async yzx_txsp() {
    await this.yzx_mailerTask('腾讯视频提醒', '腾讯视频签到');
  }
  // 腾讯视频 每个月最后一天晚上8点
  @Cron('0 0 20 * * *')
  async yzx_txsp_last() {
    const day = dayjs().date();
    const lastDay = dayjs().daysInMonth();
    if (lastDay - day <= 2) {
      await this.yzx_mailerTask('腾讯视频提醒', '腾讯视频签到');
    }
  }
  // 维生素，早上8.50 晚上7.00
  @Cron('0 50 8 * * *')
  async yzx_wss1() {
    await this.yzx_mailerTask('维生素提醒', '补充钙片维生素');
  }
  @Cron('0 0 19 * * *')
  async yzx_wss2() {
    await this.yzx_mailerTask('维生素提醒', '补充钙片维生素');
  }
}
