---
title: ShiftAnd
nav:
  title: 算法
  path: /algorithms
  order: 3
group:
  title: 串
  path: /sorting
  order: 2
---

# ShiftAnd(ShiftAnd)

Shift-And 算法的核心思想是利用掩码 D 来记录模式串的前缀匹配情况。
常用用作于流数据匹配和，正则模式匹配(同一下标位可能出现多个字符)

1. 对模式串进行处理，对每个存在的字符生成二进制数字
1. 遍历文本串依次进行匹配
1. 标记数字 p，二进制第 i 位为 1 表示遍历当前字符时可匹配模式串的前 i 位
1. 当 p 最高位为 1 时说明已匹配完成模式串

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/sequence/shiftAnd.ts)

```ts
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
  const len = pattern.length;
  let p = 0;
  /**
   * p 二进制位第i位为1表示，前i位匹配模式串成功
   * (p << 1) | 1 下次匹配时可能匹配的所有前i位 所有的1向左移动一位 和 可能匹配当前首位
   * num & next(text[i]) 当前字符出现过的下标位是否与当前可能匹配的位置相同 从而获取当前字符下能够匹配的所有位置
   * p & (1 << (len - 1)) p的最高位为1 表示匹配完整条模式串
   */
  for (let i = 0; text[i]; i++) {
    p = ((p << 1) | 1) & next(text[i]);
    if (p & (1 << (len - 1))) return i - len + 1;
  }
  return -1;
}
```
