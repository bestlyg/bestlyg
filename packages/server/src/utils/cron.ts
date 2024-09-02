import { CronJob } from 'cron';

export function createCronJob(...args: ConstructorParameters<typeof CronJob>) {
    args[3] ??= false;
    return new CronJob(...args);
}
