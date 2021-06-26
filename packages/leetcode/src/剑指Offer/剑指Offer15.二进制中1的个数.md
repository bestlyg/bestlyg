---
title: 剑指 Offer 15. 二进制中1的个数
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

# 剑指 Offer 15. 二进制中1的个数
    
> 链接：[剑指 Offer 15. 二进制中1的个数](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)  
> 难度：简单  
> 标签：位运算  
> 简介：请实现一个函数，输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。
      
## 题解 1 - typescript
- 编辑时间：2021.06.23
- 执行用时：96ms
- 内存消耗：39.1mb
- 编程语言：typescript
- 解法介绍：二进制判断。
```typescript
var hammingWeight = function (n) {
        let ans = 0;
        for (let i = 0; i <= 31; i++) {
          if ((n >> i) & 1) ans++;
        }
        return ans;
      };
```

      