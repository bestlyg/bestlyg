import { createCronJob, sendMail, parseMarkdown } from '@/utils/index';
import { CronJob } from 'cron';
import dayjs from 'dayjs';

export async function sendMailToLyg(name: string, content: string) {
    await sendMail(['1057966749@qq.com'], `定时提醒-${name}`, content);
}
export async function sendMailToYzx(name: string, content: string) {
    await sendMail(['2428047022@qq.com'], `定时提醒-${name}`, content);
}

const ownerDailyJob = createCronJob('0 0 8,20 * * *', async () => {
    const now = dayjs();
    const subject = `${dayjs().format('YYYY-MM-DD')}日报`;
    await sendMailToLyg(
        subject,
        await parseMarkdown(
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
});

const coupon3 = createCronJob('0 55 9 * * 3', async () => {
    await sendMailToYzx('抢劵', '抢劵');
});

const coupon5 = createCronJob('0 55 10 * * 5', async () => {
    await sendMailToYzx('抢劵', '抢劵');
});

const daily = createCronJob('0 30 7 * * *', async () => {
    await sendMailToYzx('建行/番茄/支付宝小鸡/淘金币', '建行/番茄/支付宝小鸡/淘金币');
});

const medicine = createCronJob('0 0 22 * * *', async () => {
    await sendMailToYzx('吃药', '吃药');
});

class Scheduler {
    jobs: CronJob[] = [];
    add(job: CronJob<any, any>) {
        this.jobs.push(job);
        return this;
    }
    start() {
        for (const job of this.jobs) {
            job.start();
        }
        return this;
    }
}

export const scheduler = new Scheduler()
    .add(ownerDailyJob)
    .add(coupon3)
    .add(coupon5)
    .add(daily)
    .add(medicine);
