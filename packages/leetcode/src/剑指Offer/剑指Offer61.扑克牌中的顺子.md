---
title: 剑指 Offer 61. 扑克牌中的顺子
order: 61
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 61. 扑克牌中的顺子

> 链接：[剑指 Offer 61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)  
> 难度：简单  
> 标签：数组、排序  
> 简介：从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这 5 张牌是不是连续的。2 ～ 10 为数字本身，A 为 1，J 为 11，Q 为 12，K 为 13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：0ms
- 内存消耗：9.9mb
- 编程语言：c++
- 解法介绍：排序后遍历。

```c++
class Solution {
   public:
    bool isStraight(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int cnt0 = 0;
        for (int i = 0; i < nums.size() - 1; i++) {
            int num = nums[i];
            if (num == 0)
                cnt0++;
            else if (nums[i + 1] == num)
                return 0;
            else if (nums[i + 1] != num + 1) {
                if (nums[i + 1] - num - 1 > cnt0) return 0;
                cnt0 -= nums[i + 1] - num;
            }
        }
        return 1;
    }
};
```
