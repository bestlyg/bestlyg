---
title: 剑指 Offer II 003. 前 n 个数字二进制中 1 的个数
order: 3
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 003. 前 n 个数字二进制中 1 的个数

> 链接：[剑指 Offer II 003. 前 n 个数字二进制中 1 的个数](https://leetcode-cn.com/problems/w3tCBm/)  
> 难度：简单  
> 标签：位运算、动态规划  
> 简介：给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：8ms
- 内存消耗：8.4MB
- 编程语言：c++
- 解法介绍：当遇到 2 的指数幂后，从 0 开始重新遍历。

```cpp
class Solution {
   public:
    vector<int> countBits(int n) {
        vector<int> ans;
        ans.push_back(0);
        if (n == 0) return ans;
        ans.push_back(1);
        if (n == 1) return ans;
        for (int num = 2, i = 0; num <= n; num++, i++) {
            if ((num & (num - 1)) == 0) i = 0;
            ans.push_back(ans[i] + 1);
        }
        return ans;
    }
};
```
