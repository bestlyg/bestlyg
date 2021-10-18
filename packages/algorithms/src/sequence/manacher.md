---
title: Manacher
nav:
  title: 算法
  path: /algorithms
  order: 3
group:
  title: 串
  path: /sorting
  order: 2
---

# Manacher(Manacher)

Manacher 算法，又叫“马拉车”，它可以在时间复杂度和空间复杂度都是 O(n)的情况下，求出一个字符串的最长回文串长度。

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/sequence/manacher.ts)

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
