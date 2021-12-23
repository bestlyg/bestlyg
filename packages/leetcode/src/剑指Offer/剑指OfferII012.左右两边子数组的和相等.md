---
title: 剑指 Offer II 012. 左右两边子数组的和相等
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

# 剑指 Offer II 012. 左右两边子数组的和相等

> 链接：[剑指 Offer II 012. 左右两边子数组的和相等](https://leetcode-cn.com/problems/tvdfij/)  
> 难度：简单  
> 标签：数组、前缀和  
> 简介：给你一个整数数组 nums ，请计算数组的 中心下标 。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：12ms
- 内存消耗：30.2mb
- 编程语言：c++
- 解法介绍：前缀和。

```c++
class Solution {
   public:
    int findMiddleIndex(vector<int>& nums) {
        int sum = 0;
        for (auto& num : nums) sum += num;
        int pre = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (sum - nums[i] == pre) return i;
            pre += nums[i];
            sum -= nums[i];
        }
        return -1;
    }
};
```
