---
title: 剑指 Offer II 008. 和大于等于 target 的最短子数组
order: 8
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 008. 和大于等于 target 的最短子数组

> 链接：[剑指 Offer II 008. 和大于等于 target 的最短子数组](https://leetcode-cn.com/problems/2VG8Kg/)  
> 难度：中等  
> 标签：数组、二分查找、前缀和、滑动窗口  
> 简介：给定一个含有  n  个正整数的数组和一个正整数 target 。找出该数组中满足其和 ≥ target 的长度最小的 连续子数组  [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

## 题解 1 - c++

- 编辑时间：2021.12.24
- 执行用时：8ms
- 内存消耗：10.4MB
- 编程语言：c++
- 解法介绍：双指针。

```cpp
class Solution {
   public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int l = 0, r = 0, num = 0, ans = INT_MAX, n = nums.size();
        while (r < n) {
            while (r < n && num < target) num += nums[r++];
            while (l < r && num - nums[l] >= target) num -= nums[l++];
            if (num >= target) ans = min(ans, r - l);
            num -= nums[l++];
        }
        return ans == INT_MAX ? 0 : ans;
    }
};
```
