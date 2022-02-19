---
title: 剑指 Offer II 007. 数组中和为 0 的三个数
order: 7
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 007. 数组中和为 0 的三个数
    
> 链接：[剑指 Offer II 007. 数组中和为 0 的三个数](https://leetcode-cn.com/problems/1fGaJU/)  
> 难度：中等  
> 标签：数组、双指针、排序  
> 简介：给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请找出所有和为 0 且 不重复 的三元组。
      
## 题解 1 - c++
- 编辑时间：2022.02.18
- 执行用时：60ms
- 内存消耗：19.3MB
- 编程语言：c++
- 解法介绍：循环双指针。
```c++
class Solution {
   public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> ans;
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size() && nums[i] <= 0; i++) {
            if (i != 0 && nums[i] == nums[i - 1]) continue;
            int sum, l = i + 1, r = nums.size() - 1;
            while (l < r) {
                sum = nums[l] + nums[r] + nums[i];
                if (sum == 0) {
                    ans.push_back(vector<int>{nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    l++;
                } else if (sum > 0)
                    r--;
                else
                    l++;
            }
        }
        return ans;
    }
};
```

      