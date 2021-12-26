---
title: 剑指 Offer 56 - I. 数组中数字出现的次数
order: 56
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 56 - I. 数组中数字出现的次数

> 链接：[剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/maximum-number-of-eaten-apples/)  
> 难度：中等  
> 标签：贪心、数组、堆(优先队列)  
> 简介：给你两个长度为 n 的整数数组 days 和 apples ，返回你可以吃掉的苹果的最大数目。

## 题解 1 - c++

- 编辑时间：2021.12.24
- 执行用时：16ms
- 内存消耗：15.6mb
- 编程语言：c++
- 解法介绍：异或得到两个唯一数的值，根据首个不同的位数，分别异或。

```c++
class Solution {
   public:
    vector<int> singleNumbers(vector<int> &nums) {
        int val = 0;
        for (auto &num : nums) val ^= num;
        vector<int> ans(2, 0);
        int bit = 0;
        while ((val & 1 << bit) == 0) bit++;
        bit = 1 << bit;
        for (auto &num : nums) {
            if (num & bit)
                ans[0] ^= num;
            else
                ans[1] ^= num;
        }
        return ans;
    }
};
```
