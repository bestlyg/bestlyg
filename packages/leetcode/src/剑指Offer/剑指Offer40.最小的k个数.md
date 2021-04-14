---
title: 剑指Offer40.最小的k个数
order: 40
nav:
  title: 力扣题解
  path: /leetcode
  order: 3
  order: 3
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 200000
---

# 剑指 Offer 40. 最小的 k 个数

> 链接：[剑指 Offer 40. 最小的 k 个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)  
> 难度：简单  
> 标签：堆、分治算法  
> 简介：输入整数数组 arr ，找出其中最小的 k 个数。

## 题解 1 - typescript

- 编辑时间：2021.04.09
- 执行用时：228ms
- 内存消耗：45.5mb
- 编程语言：typescript
- 解法介绍：构建堆。

```typescript
class Heap {
  private arr: number[] = [];
  get isEmpty() {
    return this.size === 0;
  }
  get size() {
    return this.arr.length;
  }
  constructor(private compare: (num1: number, num2: number) => number) {}
  add(num: number): void {
    this.arr.push(num);
    this.shiftUp(this.size - 1);
  }
  remove(): number {
    const num = this.arr.shift();
    this.arr.unshift(this.arr.pop()!);
    this.shiftDown(0);
    return num;
  }
  private shiftUp(index: number): void {
    const parentIndex = (index - 1) >> 1;
    if (this.compare(this.arr[index], this.arr[parentIndex]) > 0) {
      [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
      this.shiftUp(parentIndex);
    }
  }
  private shiftDown(index: number): void {
    let childrenIndex = index * 2 + 1;
    if (this.compare(this.arr[childrenIndex + 1], this.arr[childrenIndex]) > 0) {
      childrenIndex++;
    }
    if (this.compare(this.arr[childrenIndex], this.arr[index]) > 0) {
      [this.arr[childrenIndex], this.arr[index]] = [this.arr[index], this.arr[childrenIndex]];
      this.shiftDown(childrenIndex);
    }
  }
}

function getLeastNumbers(arr: number[], k: number): number[] {
  const ans: number[] = [];
  const heap = new Heap((num1, num2) => num2 - num1);
  arr.forEach(v => heap.add(v));
  while (k--) ans.push(heap.remove());
  return ans;
}
```
