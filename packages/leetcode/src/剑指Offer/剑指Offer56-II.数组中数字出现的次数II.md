---
title: 剑指 Offer 56 - II. 数组中数字出现的次数 II
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

# 剑指 Offer 56 - II. 数组中数字出现的次数 II
    
> 链接：[剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)  
> 难度：中等  
> 标签：位运算、数组  
> 简介：在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
      
## 题解 1 - c++
- 编辑时间：2021.12.24
- 执行用时：40ms
- 内存消耗：15.8mb
- 编程语言：c++
- 解法介绍：用数组存储每个位有几个1。
```c++
class Solution {
   public:
    int singleNumber(vector<int>& nums) {
        int list[40] = {0};
        for (auto& num : nums) {
            for (int i = 0; i < 32; i++) {
                if (num & (1 << i)) list[i]++;
            }
        }
        int ans = 0;
        for (int i = 0; i < 32; i++) {
            if (list[i] % 3) {
                ans |= 1 << i;
            }
        }
        return ans;
    }
};
```

      