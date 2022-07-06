---
title: Sunday
nav:
  title: 算法
  path: /algorithms
  order: 3
group:
  title: 串
  path: /sequence
  order: 3
---

# Sunday(Sunday)

- Sunday 算法由 Daniel M.Sunday 在 1990 年提出。
- 只不过 Sunday 算法是从前往后匹配，在匹配失败时关注的是主串中参加匹配的最末位字符的下一位字符。
- 常用作快速匹配文本。

1. 对模式串进行处理，获取每个字符最后一位出现的下标
1. 遍历文本串依次进行匹配
1. 当前字符无法匹配时，获取 i+len 下标的字符从模式串中进行查找，从而进行快速匹配



## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/sequence/sunday.ts)
```ts
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

```
