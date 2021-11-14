---
title: Fenwick Tree
order: 7
nav:
  title: 数据结构
  path: /data-structures
  order: 2
group:
  title: 树
  path: /tree
  order: 4
---

# Fenwick Tree

树状数组是用来解决在数组元素动态变化的情况下，高效的计算子数组和的一种数据结构，其更新效率和计算和的效率均为 O（logn），和普通的 sum 数组不同的是，虽然 sum 数组计算子数组和的效率为 O（1），但是在面对数组元素动态变化的情况下，其更新效率为 O（n）。

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/data-structures/src/tree/fenwickTree.ts)

```ts
/**
 * 树状数组
 */
export class FenwickTree {
  private list: number[];
  constructor(private n: number) {
    this.list = new Array(n + 1).fill(0);
  }
  /**
   * 修改下标所在元素的值
   * @param idx 下标
   * @param num 值
   */
  add(idx: number, num: number): void {
    while (idx <= this.n) {
      this.list[idx] += num;
      idx += this.lowbit(idx);
    }
  }
  /**
   * 获取下标所在元素的值
   * @param idx
   * @returns
   */
  at(idx: number): number {
    return this.query(idx) - this.query(idx - 1);
  }
  /**
   * 查询下标所在元素的前缀和
   * @param idx 下标
   * @returns
   */
  query(idx: number): number {
    let sum = 0;
    while (idx) {
      sum += this.list[idx];
      idx -= this.lowbit(idx);
    }
    return sum;
  }
  /**
   * 获取数据的最低位1
   * @param num 值
   * @returns
   */
  private lowbit(num: number) {
    return num & -num;
  }
}
```
