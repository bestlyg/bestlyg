/**
 * 十进制转化为16进制, 填充为8位长度的字符串
 */
export function dec2hex(num: string | number): string {
    return Number(num).toString(16).padStart(8, '0');
}
