---
title: 剑指 Offer 53 - I. 在排序数组中查找数字 I
order: 53
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 53 - I. 在排序数组中查找数字 I

> 链接：[剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)  
> 难度：简单  
> 标签：数组、二分查找  
> 简介：统计一个数字在排序数组中出现的次数。

## 题解 1 - typescript

- 编辑时间：2021.07.16
- 执行用时：84ms
- 内存消耗：40.8mb
- 编程语言：typescript
- 解法介绍：哈希储存。

```typescript
function search(nums: number[], target: number): number {
  return (
    nums.reduce<Record<number, number>>((record, cur) => {
      record[cur] = (record[cur] ?? 0) + 1;
      return record;
    }, {})[target] ?? 0
  );
}
```
