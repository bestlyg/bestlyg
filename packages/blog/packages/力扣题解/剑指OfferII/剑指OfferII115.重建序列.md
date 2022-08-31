---
title: 剑指 Offer II 115. 重建序列
order: 115
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 115. 重建序列

> 链接：[剑指 Offer II 115. 重建序列](https://leetcode.cn/problems/ur2n8P/)  
> 难度：中等  
> 标签：图、拓扑排序、数组  
> 简介：检查 nums 是否是唯一的最短 超序列 。

## 题解 1 - cpp

- 编辑时间：2022.07.23
- 执行用时：188ms
- 内存消耗：107.3MB
- 编程语言：cpp
- 解法介绍：判断是否只有唯一的拓扑排序。

```cpp
class Solution {
   public:
    struct node {
        unordered_set<int> children, parent;
    };
    bool sequenceReconstruction(vector<int>& nums,
                                vector<vector<int>>& sequences) {
        int n = nums.size();
        vector<node> m(n + 1, node());
        for (auto& item : sequences) {
            for (int i = 0; i < item.size() - 1; i++) {
                int parent = item[i], child = item[i + 1];
                m[parent].children.insert(child);
                m[child].parent.insert(parent);
            }
        }
        for (int i = 0; i < n; i++) {
            int num = nums[i];
            if (m[num].parent.size()) return false;
            int nextcnt = 0;
            for (auto& child : m[num].children) {
                m[child].parent.erase(num);
                if (m[child].parent.size() == 0) nextcnt++;
            }
            if (i < n - 1 && nextcnt != 1) return false;
        }
        return true;
    }
};
```
