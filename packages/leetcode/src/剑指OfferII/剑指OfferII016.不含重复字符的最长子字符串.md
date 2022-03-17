---
title: 剑指 Offer II 016. 不含重复字符的最长子字符串
order: 16
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 016. 不含重复字符的最长子字符串

> 链接：[剑指 Offer II 016. 不含重复字符的最长子字符串](https://leetcode-cn.com/problems/wtcaE1/)  
> 难度：中等  
> 标签：哈希表、字符串、滑动窗口  
> 简介：给定一个字符串 s ，请你找出其中不含有重复字符的 最长连续子字符串 的长度。

## 题解 1 - c++

- 编辑时间：2021.12.24
- 执行用时：8ms
- 内存消耗：6.8MB
- 编程语言：c++
- 解法介绍：双指针。

```cpp
class Solution {
          public:
    int lengthOfLongestSubstring(string s) {
        int arr[200] = {0}, l = 0, r = 0, ans = 0, n = s.size();
        while (r < n) {
            while (r < n && arr[s[r]] < 1) arr[s[r++]]++;
            ans = max(ans, r - l);
            char ch = s[r++];
            arr[ch]++;
            while (s[l] != ch) arr[s[l++]]--;
            arr[s[l++]]--;
        }
        return ans;
    }
};
```
