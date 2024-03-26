/**
 * 遍历模式串，获取每个字符出现的最后一个下标位
 * @param pattern
 * @returns 返回函数，传入任意字符，返回该字符在模式串中的下标位，不存在返回-1
 */
function getMap(pattern: string): (c: string) => number {
    const map: Record<string, number> = {};
    for (let i = 0; pattern[i]; i++) map[pattern[i]] = i;
    return c => map[c] ?? -1;
}
export function sunday(text: string, pattern: string): number {
    const map = getMap(pattern);
    const len = pattern.length;
    /**
     * i 当前匹配的字符下标位
     * len - map( text[i + len]  ) 对齐文本串与模式串第i+len位的下标，进行快速匹配
     */
    for (let i = 0; text[i]; i += len - map(text[i + len])) {
        let j = 0;
        while (pattern[j] && pattern[j] === text[i + j]) j++;
        if (!pattern[j]) return i;
    }
    return -1;
}
