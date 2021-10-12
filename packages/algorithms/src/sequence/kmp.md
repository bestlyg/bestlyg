---
title: KMP
nav:
  title: 算法
  path: /algorithms
  order: 3
group:
  title: 串
  path: /sorting
  order: 2
---

# KMP(KMP)

KMP 是 Knuth–Morris–Pratt 的简称（取名自 3 位发明人的名字），于 1977 年发布。
KMP 的精妙之处：充分利用了此前比较过的内容，可以很聪明地跳过一些不必要的比较位置，KMP 会预先根据模式串的内容生成一张 next 表（一般是个数组）
利用状态机原理，对模式串进行生成状态机数组，遍历文本串，对于每一位文本串更改模式串状态。
每次只处理当前字符，不需要全文本串的载入，常用于流数据的匹配。

1. 对模式串进行处理，遍历模式串依次判断以当前位置结尾时，最多 n 位尾部字符串能匹配 n 位头部字符串，生成 next 数组
1. 遍历文本串依次进行匹配
1. 当前字符无法匹配时，进行回溯快速前进

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/sequence/kmp.ts)

```ts
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
```
