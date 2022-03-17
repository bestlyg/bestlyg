---
title: 剑指 Offer II 036. 后缀表达式
order: 36
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 036. 后缀表达式

> 链接：[剑指 Offer II 036. 后缀表达式](https://leetcode-cn.com/problems/8Zf90G/)  
> 难度：中等  
> 标签：栈、数组、数学  
> 简介：根据 逆波兰表示法，求该后缀表达式的计算结果。

## 题解 1 - c++

- 编辑时间：2021.12.23
- 执行用时：12ms
- 内存消耗：11.6MB
- 编程语言：c++
- 解法介绍：栈存储。

```cpp
class Solution {
   public:
    int s2i(string str) {
        int ans = 0, f = 1;
        for (int i = 0; i < str.size(); i++) {
            if (i == 0 && str[i] == '-') {
                f = -1;
                continue;
            }
            ans = ans * 10 + str[i] - '0';
        }
        return ans * f;
    }
    int evalRPN(vector<string>& tokens) {
        stack<int> s;
        for (auto& str : tokens) {
            if (str == "+" || str == "-" || str == "*" || str == "/") {
                int num1 = s.top();
                s.pop();
                int num2 = s.top();
                s.pop();
                int ans;
                if (str == "+")
                    ans = num2 + num1;
                else if (str == "-")
                    ans = num2 - num1;
                else if (str == "*")
                    ans = num2 * num1;
                else
                    ans = num2 / num1;
                s.push(ans);
            } else {
                s.push(s2i(str));
            }
        }
        return s.top();
    }
};
```
