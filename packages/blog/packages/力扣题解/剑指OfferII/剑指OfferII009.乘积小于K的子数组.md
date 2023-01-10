---
title: 剑指 Offer II 009. 乘积小于 K 的子数组
order: 9
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 009. 乘积小于 K 的子数组

> 链接：[剑指 Offer II 009. 乘积小于 K 的子数组](https://leetcode-cn.com/problems/ZVAVXX/)  
> 难度：中等  
> 标签：数组、滑动窗口  
> 简介：请找出该数组内乘积小于 k 的连续的子数组的个数。

## 题解 1 - c++

- 编辑时间：2021.12.24
- 执行用时：84ms
- 内存消耗：59.7MB
- 编程语言：c++
- 解法介绍：双指针。

```cpp
class Solution {
   public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k == 0) return 0;
        int n = nums.size(), l = 0, r = 0, num = 1, ans = 0;
        while (l < n && r <= n) {
            while (r < n && num < k) num *= nums[r++];
            ans += r - l - (num >= k ? 1 : 0);
            num /= nums[l++];
        }
        return max(ans, 0);
    }
};
```

## 题解 2 - c++

- 编辑时间：2021.12.24
- 执行用时：49ms
- 内存消耗：59.8MB
- 编程语言：c++
- 解法介绍：双指针。

```cpp
class Solution {
   public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k == 0) return 0;
        int ans = 0, num = 1, l = 0;
        for (int r = 0; r < nums.size(); r++) {
            num *= nums[r];
            while (l <= r && num >= k) num /= nums[l++];
            ans += r - l + 1;
        }
        return ans;
    }
};
```
