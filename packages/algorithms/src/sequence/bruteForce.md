---
title: 暴力匹配
nav:
  title: 算法
  path: /algorithms
  order: 3
group:
  title: 串
  path: /sequence
  order: 2
---

# 暴力匹配(BruteForce)

遍历文本串每一个字符，依次匹配模式串

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/sequence/bruteForce.ts)

```ts
export function bruteForce(text: string, pattern: string): number {
  const len = pattern.length;
  for (let i = 0; text[i]; i++) {
    const substr = text.substr(i, len);
    if (substr === pattern) return i;
  }
  return -1;
}
```
