---
title: 剑指 Offer II 041. 滑动窗口的平均值
order: 41
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 041. 滑动窗口的平均值

> 链接：[剑指 Offer II 041. 滑动窗口的平均值](https://leetcode.cn/problems/qIsx9U/)  
> 难度：简单  
> 标签：设计、队列、数组、数据流  
> 简介：给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算滑动窗口里所有数字的平均值。

## 题解 1 - cpp

- 编辑时间：2022.07.16
- 执行用时：20ms
- 内存消耗：13.7MB
- 编程语言：cpp
- 解法介绍：queue。

```cpp
class MovingAverage {
   public:
    int size, sum = 0;
    queue<int> q;
    MovingAverage(int size) { this->size = size; }
    double next(int val) {
        if (q.size() >= size) {
            sum -= q.front();
            q.pop();
        }
        q.push(val);
        sum += val;
        return sum * 1.0 / q.size();
    }
};
```
