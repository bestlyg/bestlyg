import { CronJob } from 'cron';

export function createScheduleJob(...args: ConstructorParameters<typeof CronJob>) {
    args[3] ??= false;
    return new CronJob(...args);
}

export function sendMailToBestLyg() {}
