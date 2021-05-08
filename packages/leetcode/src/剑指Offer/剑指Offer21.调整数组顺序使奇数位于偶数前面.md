---
title: 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
order: NaN
nav:
  title: 力扣题解
  path: /leetcode
  order: 3
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 200000
---

# 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
    
> 链接：[剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)  
> 难度：简单  
> 标签：  
> 简介：输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
      
## 题解 1 - typescript
- 编辑时间：2021.05.07
- 执行用时：132ms
- 内存消耗：47.1mb
- 编程语言：typescript
- 解法介绍：利用内部排序。
```typescript
function exchange(nums: number[]): number[] {
        return [...nums.filter(v=>v&1),...nums.filter(v=>!(v&1))]
    };
```

      