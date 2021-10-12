/**
 * 遍历模式串对每个字符生成数字
 * 字符在模式串第i位出现过 num |= 1 <<i
 * @param pattern
 * @returns 返回函数，传入任意字符，返回数字，不存在返回-1
 */
function getNext(pattern: string): (c: string) => number {
  const next: Record<string, number> = {};
  for (let i = 0; pattern[i]; i++) {
    if (!next[pattern[i]]) next[pattern[i]] = 0;
    next[pattern[i]] |= 1 << i;
  }
  return c => next[c] ?? 0;
}
export function shiftAnd(text: string, pattern: string): number {
  const next = getNext(pattern);
  /**
   * p 二进制位第i位为1表示，前i位匹配模式串成功
   * (p << 1) | 1 下次匹配时可能匹配的所有前i位 所有的1向左移动一位 和 可能匹配当前首位
   * num & next(text[i]) 当前字符出现过的下标位是否与当前可能匹配的位置相同 从而获取当前字符下能够匹配的所有位置
   * p & (1 << (len - 1)) p的最高位为1 表示匹配完整条模式串
   */
  for (let i = 0, p = 0, len = pattern.length; text[i]; i++) {
    p = ((p << 1) | 1) & next(text[i]);
    if (p & (1 << (len - 1))) return i - len + 1;
  }
  return -1;
}
