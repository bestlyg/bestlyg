import { dayjs } from '@bestlyg/cli';
import { parseMarkdown, PGPASSWORD, sendMail } from '../utils/index.js';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { execSync } from 'child_process';

@Injectable()
export class TasksService {
    async sendMailToLyg(name: string, content: string) {
        await sendMail(['1057966749@qq.com'], `定时提醒-${name}`, content);
    }
    async sendMailToYzx(name: string, content: string) {
        await sendMail(['2428047022@qq.com'], `定时提醒-${name}`, content);
    }
    private readonly logger = new Logger(TasksService.name);

    @Cron('0 0 0 * * *')
    async backupDB() {
        const cmd = `PGPASSWORD=${PGPASSWORD} pg_dump -h localhost -p 5432 -U root -f /root/best_data.sql best_data`;
        this.logger.log(`backup: ${cmd}`);
        execSync(cmd);
    }
    @Cron('0 0 8,20 * * *')
    async daily() {
        const now = dayjs();
        const subject = `${dayjs().format('YYYY-MM-DD')}日报`;
        const content = await parseMarkdown(
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
        );
        await this.sendMailToLyg(subject, content);
    }
    @Cron('0 55 9 * * 3')
    async coupon3() {
        await this.sendMailToYzx('抢劵', '抢劵');
    }

    @Cron('0 55 10 * * 5')
    async coupon5() {
        await this.sendMailToYzx('抢劵', '抢劵');
    }

    @Cron('0 30 7 * * *')
    async dailyYzx() {
        await this.sendMailToYzx('建行/番茄/支付宝小鸡/淘金币', '建行/番茄/支付宝小鸡/淘金币');
    }

    @Cron('0 0 22 * * *')
    async medicine() {
        await this.sendMailToYzx('吃药', '吃药');
    }
}
