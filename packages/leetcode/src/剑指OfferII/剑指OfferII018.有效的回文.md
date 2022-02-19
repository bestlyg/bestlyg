---
title: 剑指 Offer II 018. 有效的回文
order: 18
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 018. 有效的回文
    
> 链接：[剑指 Offer II 018. 有效的回文](https://leetcode-cn.com/problems/XltzEq/)  
> 难度：简单  
> 标签：双指针、字符串  
> 简介：给定一个字符串 s ，验证 s 是否是 回文串 ，只考虑字母和数字字符，可以忽略字母的大小写。
      
## 题解 1 - c++
- 编辑时间：2022.02.18
- 执行用时：4ms
- 内存消耗：7.2MB
- 编程语言：c++
- 解法介绍：双指针遍历。
```c++
class Solution {
   public:
    bool isPalindrome(string s) {
        if (s == " ") return 1;
        int l = 0, r = s.size() - 1;
        char lc, rc;
        while (l < r) {
            do {
                lc = tolower(s[l++]);
            } while (l < s.size() && !isdigit(lc) && !isalpha(lc));
            do {
                rc = tolower(s[r--]);
            } while (r >= 0 && !isdigit(rc) && !isalpha(rc));
            if (l < s.size() && r >= 0 && lc != rc) return 0;
        }
        return 1;
    }
};
```

      