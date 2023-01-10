---
title: 剑指 Offer II 069. 山峰数组的顶部
order: 69
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 069. 山峰数组的顶部

> 链接：[剑指 Offer II 069. 山峰数组的顶部](https://leetcode-cn.com/problems/B1IidL/)  
> 难度：简单  
> 标签：数组、二分查找  
> 简介：给定由整数组成的山峰数组 arr ，返回任何满足 arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1] 的下标 i ，即山峰顶部。

## 题解 1 - typescript

- 编辑时间：2021.10.14
- 执行用时：76ms
- 内存消耗：40.2MB
- 编程语言：typescript
- 解法介绍：遍历。

```typescript
function peakIndexInMountainArray(arr: number[]): number {
  let ans = 0;
  for (let i = 0, l = arr.length; i < l; i++) ans = arr[i] > arr[ans] ? i : ans;
  return ans;
}
```

## 题解 2 - typescript

- 编辑时间：2021.10.14
- 执行用时：68ms
- 内存消耗：40.1MB
- 编程语言：typescript
- 解法介绍：二分。

```typescript
function peakIndexInMountainArray(arr: number[]): number {
  return find(0, arr.length - 1);
  function find(l: number, r: number): number {
    if (l >= r) return l;
    const lnum = arr[l];
    const rnum = arr[r];
    const mid = (l + r) >> 1;
    const midnum = arr[mid];
    if (midnum > lnum && midnum > rnum) {
      const i1 = find(l, mid);
      const i2 = find(mid, r);
      return arr[i1] > arr[i2] ? i1 : i2;
    } else if (midnum <= rnum) {
      return find(mid + 1, r);
    } else {
      return find(l, mid - 1);
    }
  }
}
```
