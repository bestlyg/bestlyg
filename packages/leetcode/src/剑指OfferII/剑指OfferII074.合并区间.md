---
title: 剑指 Offer II 074. 合并区间
order: 74
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 074. 合并区间

> 链接：[剑指 Offer II 074. 合并区间](https://leetcode-cn.com/problems/SsGoHC/)  
> 难度：中等  
> 标签：数组、排序  
> 简介：以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：20ms
- 内存消耗：13.8MB
- 编程语言：c++
- 解法介绍：排序后合并。

```c++
class Solution {
   public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> ans;
        for (auto& interval : intervals) {
            if (ans.size() > 0 && ans[ans.size() - 1][1] >= interval[0]) {
                ans[ans.size() - 1][1] =
                    max(interval[1], ans[ans.size() - 1][1]);
            } else {
                ans.push_back(interval);
            }
        }
        return ans;
    }
};
```
