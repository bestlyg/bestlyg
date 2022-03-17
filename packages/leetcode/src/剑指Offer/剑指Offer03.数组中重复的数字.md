---
title: 剑指 Offer 03. 数组中重复的数字
order: 3
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 03. 数组中重复的数字

> 链接：[剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)  
> 难度：简单  
> 标签：数组、哈希表、排序  
> 简介：找出数组中重复的数字。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：40ms
- 内存消耗：22.4MB
- 编程语言：c++
- 解法介绍：排序后遍历。

```cpp
class Solution {
   public:
    int findRepeatNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) return nums[i];
        }
        return 0;
    }
};
```
