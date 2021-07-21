---
title: 剑指 Offer 42. 连续子数组的最大和
order: NaN
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 200000
---

# 剑指 Offer 42. 连续子数组的最大和

> 链接：[剑指 Offer 42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)  
> 难度：简单  
> 标签：数组、分治、动态规划  
> 简介：输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

## 题解 1 - typescript

- 编辑时间：2021.07.17
- 执行用时：4620ms
- 内存消耗：46.1mb
- 编程语言：typescript
- 解法介绍：前缀和。

```typescript
function maxSubArray(nums: number[]): number {
  let num = 0;
  const len = nums.length;
  const sums = [0, ...nums.map(v => (num += v))];
  let ans = -Infinity;
  for (let i = 0; i < len; i++) {
    ans = Math.max(ans, nums[i]);
    const sum = sums[i + 1];
    for (let j = 0; j < i; j++) {
      const num = sum - sums[j];
      ans = Math.max(ans, num);
    }
  }
  return ans;
}
```

## 题解 2 - typescript

- 编辑时间：2021.07.17
- 执行用时：88ms
- 内存消耗：47.6mb
- 编程语言：typescript
- 解法介绍：前缀和。

```typescript
function maxSubArray(nums: number[]): number {
  let num = 0;
  const len = nums.length;
  const sums = [0, ...nums.map(v => (num += v))];
  let min = 0;
  let ans = -Infinity;
  for (let i = 0; i < len; i++) {
    const sum = sums[i + 1];
    ans = Math.max(ans, sum - min, nums[i]);
    min = Math.min(min, sum);
  }
  return ans;
}
```
