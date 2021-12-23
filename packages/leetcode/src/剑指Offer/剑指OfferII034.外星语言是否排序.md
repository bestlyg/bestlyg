---
title: 剑指 Offer II 034. 外星语言是否排序
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

# 剑指 Offer II 034. 外星语言是否排序

> 链接：[剑指 Offer II 034. 外星语言是否排序](https://leetcode-cn.com/problems/lwyVBB/)  
> 难度：简单  
> 标签：数组、哈希表、字符串  
> 简介：给定一组用外星语书写的单词 words，以及其字母表的顺序 order，只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回 false。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：4ms
- 内存消耗：9mb
- 编程语言：c++
- 解法介绍：转换成地球文进行比较。

```c++
class Solution {
   public:
    bool isAlienSorted(vector<string> &words, string order) {
        int nums[30] = {0};
        for (int i = 0; i < order.size(); i++) nums[order[i] - 'a'] = i;
        for (auto &str : words) {
            for (auto &ch : str) {
                ch = nums[ch - 'a'] + 'a';
            }
        }
        for (int i = 1; i < words.size(); i++) {
            if (words[i] < words[i - 1]) return 0;
        }
        return 1;
    }
};
```
