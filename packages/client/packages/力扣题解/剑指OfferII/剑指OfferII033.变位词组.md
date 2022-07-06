---
title: 剑指 Offer II 033. 变位词组
order: 33
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 033. 变位词组

> 链接：[剑指 Offer II 033. 变位词组](https://leetcode-cn.com/problems/sfvd7V/)  
> 难度：中等  
> 标签：哈希表、字符串、排序  
> 简介：给定一个字符串数组 strs ，将 变位词 组合在一起。 可以按任意顺序返回结果列表。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：20ms
- 内存消耗：19.1MB
- 编程语言：c++
- 解法介绍：对字符串进行排序后归并。

```cpp
class Solution {
   public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> m;
        for (int i = 0; i < strs.size(); i++) {
            string str = strs[i];
            string head = str;
            sort(head.begin(), head.end());
            m[head].push_back(str);
        }
        vector<vector<string>> ans;
        for (auto it = m.begin(); it != m.end(); it++) {
            ans.push_back(it->second);
        }
        return ans;
    }
};
```
