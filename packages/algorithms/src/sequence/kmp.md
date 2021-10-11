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

1. 对模式串进行处理，遍历模式串依次判断以当前位置结尾时，最多 n 位尾部字符串能匹配 n 位头部字符串，生成 next 数组
1. 遍历文本串依次进行匹配
1. 当前字符无法匹配时，进行回溯取到

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/sequence/kmp.ts)

```ts
import { Comparator } from '@bestlyg/shared';

export const heapSort = <T extends any>(compare: Comparator<T>, list: T[]) => {
  let lastIndex = list.length - 1;
  const shiftUp = (index: number): void => {
    if (index === 0) return;
    const parentIndex = (index - 1) >> 1;
    if (compare(list[index], list[parentIndex]) > 0) {
      [list[index], list[parentIndex]] = [list[parentIndex], list[index]];
      shiftUp(parentIndex);
    }
  };
  const shiftDown = (index: number): void => {
    let childIndex = index * 2 + 1;
    if (childIndex > lastIndex) return;
    if (childIndex + 1 <= lastIndex && compare(list[childIndex + 1], list[childIndex]) > 0)
      childIndex++;
    if (compare(list[childIndex], list[index]) > 0) {
      [list[childIndex], list[index]] = [list[index], list[childIndex]];
      shiftDown(childIndex);
    }
  };
  for (let i = 0; i <= lastIndex; i++) shiftUp(i);
  while (lastIndex > 0) {
    [list[0], list[lastIndex--]] = [list[lastIndex], list[0]];
    shiftDown(0);
  }
};
```
