---
title: 剑指 Offer 10- I. 斐波那契数列
order: 10
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 10- I. 斐波那契数列

> 链接：[剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)  
> 难度：中等  
> 标签：记忆化搜索、数学、动态规划  
> 简介：写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。

## 题解 1 - typescript

- 编辑时间：2021.09.04
- 执行用时：68ms
- 内存消耗：39.2MB
- 编程语言：typescript
- 解法介绍：动态规划。

```typescript
function fib(n: number): number {
  const MOD = 1e9 + 7;
  let [num0, num1] = [0, 1];
  if (n === 0) return num0;
  while (--n) [num0, num1] = [num1, (num1 + num0) % MOD];
  return num1;
}
```
