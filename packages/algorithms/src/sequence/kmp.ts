/**
 * 利用模式串生成状态机
 *
 * pHead********pEnd
 * pHead === pEnd
 *
 * @param pattern 模式串
 * @returns 传入当前配对的最后一位，返回模式串头部能匹配的最后一位
 */
function getNext(pattern: string): number[] {
  const next = [-1];
  /**
   * i 已匹配成功的最后一位
   * j 在最后一位为i的前提下，匹配最多能匹配到前j位
   */
  for (let i = 1, j = -1; pattern[i]; i++) {
    while (j !== -1 && pattern[i] !== pattern[j + 1]) j = next[j];
    if (pattern[i] === pattern[j + 1]) j++;
    next[i] = j;
  }
  return next;
}
export function kmp(text: string, pattern: string): number {
  const next = getNext(pattern);
  /**
   * i 当前匹配到字符下标
   * j 当前成功匹配的模式串最后一个字符的下标
   */
  for (let i = 0, j = -1; text[i]; i++) {
    const c = text[i];
    while (j !== -1 && c !== pattern[j + 1]) j = next[j];
    if (c === pattern[j + 1]) j++;
    if (!pattern[j + 1]) return i - j;
  }
  return -1;
}
