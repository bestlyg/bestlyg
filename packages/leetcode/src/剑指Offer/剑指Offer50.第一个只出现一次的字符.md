---
title: 剑指 Offer 50. 第一个只出现一次的字符
order: 50
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 50. 第一个只出现一次的字符

> 链接：[剑指 Offer 50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)  
> 难度：简单  
> 标签：队列、哈希表、字符串、计数  
> 简介：在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：20ms
- 内存消耗：10.3MB
- 编程语言：c++
- 解法介绍：存储次数，遍历两遍。

```cpp
class Solution {
   public:
    char firstUniqChar(string s) {
        int arr[30] = {0};
        for (auto &ch : s) arr[ch - 'a']++;
        for (auto &ch : s) {
            if (arr[ch - 'a'] == 1) return ch;
        }
        return ' ';
    }
};
```
