---
title: 剑指 Offer II 005. 单词长度的最大乘积
order: 5
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 005. 单词长度的最大乘积

> 链接：[剑指 Offer II 005. 单词长度的最大乘积](https://leetcode-cn.com/problems/aseY1I/)  
> 难度：中等  
> 标签：位运算、数组、字符串  
> 简介：给定一个字符串数组  words，请计算当两个字符串 words[i] 和 words[j] 不包含相同字符时，它们长度的乘积的最大值。假设字符串中只包含英语的小写字母。如果没有不包含相同字符的一对字符串，返回 0。

## 题解 1 - c++

- 编辑时间：2021.12.24
- 执行用时：380ms
- 内存消耗：20.2MB
- 编程语言：c++
- 解法介绍：用二进制存储每个字符串存在的字符，两个字符串值与运算为 0 说明无重复。

```c++
class Solution {
   public:
    int s2i(string str) {
        int ans = 0;
        for (auto &ch : str) ans |= 1 << (ch - 'a');
        return ans;
    }
    int maxProduct(vector<string> &words) {
        unordered_map<string, int> mmap;
        for (auto &word : words) mmap[word] = s2i(word);
        int ans = 0;
        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < i; j++) {
                if (mmap[words[i]] & mmap[words[j]]) continue;
                ans = max(ans, (int)(words[i].size() * words[j].size()));
            }
        }
        return ans;
    }
};
```
