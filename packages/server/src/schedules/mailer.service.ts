import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@/services';
import * as MarkdownIt from 'markdown-it';
import * as dayjs from 'dayjs';

@Injectable()
export class MailerTaskService {
  private format = 'YYYY-MM-DD';
  private md = new MarkdownIt();
  private menses = dayjs('2022-10-5');
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
      this.md.render(`
# 日报

> 这是一份专属的每日日报  
> 记录每日应该要记得的事  

1. 距离2018年1月1日已有${now.diff('2018-1-1', 'day')}天。
1. 距离上一次大姨妈(${this.menses.format(this.format)})已有${mensesCnt}天。
1. 建行生活签到。
1. 拼多多每周5元无门槛领取。
1. LeetCode每日一题。
1. Arcaea每日能量。
1. 扇贝英语每日打卡。
1. 番茄小说每日签到。`),
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
    if (cnt >= 25) {
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
    if (dayjs().month() === dayjs().daysInMonth()) {
      await this.yzx_mailerTask('腾讯视频提醒', '腾讯视频签到');
    }
  }
}
