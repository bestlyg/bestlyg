/** 轻量计时器，用于记录阶段耗时和累计耗时。 */
export class TimeRecorder {
    start = Date.now();
    date = Date.now();

    /** 记录从上次调用到现在的间隔毫秒数，并刷新阶段起点。 */
    record() {
        const now = Date.now();
        const d = now - this.date;
        this.date = now;
        return d;
    }

    /** 获取从实例创建到现在的累计耗时。 */
    accumulativeTotal() {
        return Date.now() - this.start;
    }

    /** 获取累计耗时的人类可读字符串。 */
    toAccumulativeTotalString() {
        return this.format(this.accumulativeTotal());
    }

    /** 获取阶段耗时的人类可读字符串，并刷新阶段起点。 */
    toString() {
        return this.format(this.record());
    }

    /** 将毫秒数格式化为人类可读字符串。 */
    format(d: number) {
        return secondsToReadableTime(d);
    }
}

/**
 * 把毫秒转成可读的字符串，如 1天 2小时 3分钟 4秒
 * @param ms 毫秒
 * @returns 可读的字符串
 */
export function secondsToReadableTime(ms: number) {
    const seconds = ms / 1000;
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const millisecond = ms % 1000;

    let result = '';

    if (days > 0) {
        result += `${days}天`;
    }
    if (hours > 0) {
        result += `${hours}小时`;
    }
    if (minutes > 0) {
        result += `${minutes}分钟`;
    }
    if (remainingSeconds > 0) {
        result += `${remainingSeconds}秒`;
    }
    if (millisecond > 0) {
        result += `${millisecond}毫秒`;
    }

    if (!result) {
        result += `0毫秒`;
    }

    return result.trim();
}
