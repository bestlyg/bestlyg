---
title: 剑指 Offer II 019. 最多删除一个字符得到回文
order: 19
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 019. 最多删除一个字符得到回文
    
> 链接：[剑指 Offer II 019. 最多删除一个字符得到回文](https://leetcode-cn.com/problems/RQku0D/)  
> 难度：简单  
> 标签：贪心、双指针、字符串  
> 简介：给定一个非空字符串 s，请判断如果 最多 从字符串中删除一个字符能否得到一个回文字符串。
      
## 题解 1 - c++
- 编辑时间：2022.02.18
- 执行用时：48ms
- 内存消耗：19MB
- 编程语言：c++
- 解法介绍：双指针遍历。
```c++
class Solution {
   public:
    bool check(string &s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) return 0;
            l++;
            r--;
        }
        return 1;
    }
    bool validPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        for (int l = 0, r = s.size() - 1; l < r; l++, r--) {
            if (s[l] == s[r])
                continue;
            else
                return check(s, l, r - 1) || check(s, l + 1, r);
        }
        return 1;
    }
};
```

      