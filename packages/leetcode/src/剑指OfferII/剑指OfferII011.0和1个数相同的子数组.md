---
title: 剑指 Offer II 011. 0 和 1 个数相同的子数组
order: 11
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 011. 0 和 1 个数相同的子数组

> 链接：[剑指 Offer II 011. 0 和 1 个数相同的子数组](https://leetcode-cn.com/problems/A1NYOS/)  
> 难度：中等  
> 标签：数组、哈希表、前缀和  
> 简介：给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：116ms
- 内存消耗：81.7mb
- 编程语言：c++
- 解法介绍：前缀和。

```c++
class Solution {
   public:
    int findMaxLength(vector<int>& nums) {
        int ans = 0, sum = 0;
        unordered_map<int, int> mmap;
        mmap[0] = -1;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i] == 1 ? 1 : -1;
            if (mmap.count(sum)) {
                ans = max(ans, i - mmap[sum]);
            } else {
                mmap[sum] = i;
            }
        }
        return ans;
    }
};
```
