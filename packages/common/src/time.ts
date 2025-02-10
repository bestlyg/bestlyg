/**
 * 把毫秒转成可读的字符串，如 1天 2小时 3分钟 4秒
 * @param ms 毫秒
 * @returns 可读的字符串
 */
export function humanReadableTime(ms: number) {
    const seconds = ms / 1000;
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let result = '';

    if (days > 0) {
        result += `${days}天 `;
    }
    if (hours > 0) {
        result += `${hours}小时 `;
    }
    if (minutes > 0) {
        result += `${minutes}分钟 `;
    }
    if (remainingSeconds > 0) {
        result += `${remainingSeconds}秒`;
    }

    return result.trim();
}
