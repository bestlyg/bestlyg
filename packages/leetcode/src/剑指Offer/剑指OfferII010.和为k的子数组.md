---
title: 剑指 Offer II 010. 和为 k 的子数组
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

# 剑指 Offer II 010. 和为 k 的子数组

> 链接：[剑指 Offer II 010. 和为 k 的子数组](https://leetcode-cn.com/problems/QTMn0o/)  
> 难度：中等  
> 标签：数组、哈希表、前缀和  
> 简介：给定一个整数数组和一个整数 k ，请找到该数组中和为 k 的连续子数组的个数。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：80ms
- 内存消耗：40.7mb
- 编程语言：c++
- 解法介绍：前缀和。

```c++
class Solution {
   public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> mmap;
        int sum = 0, ans = 0;
        mmap[0] = 1;
        for (auto& num : nums) {
            sum += num;
            if (mmap[sum - k]) ans += mmap[sum - k];
            mmap[sum]++;
        }
        return ans;
    }
};
```
