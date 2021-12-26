---
title: 剑指 Offer 59 - II. 队列的最大值
order: 59
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 59 - II. 队列的最大值

> 链接：[剑指 Offer 59 - II. 队列的最大值](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/)  
> 难度：中等  
> 标签：设计、队列、单调队列  
> 简介：请定义一个队列并实现函数 max_value 得到队列里的最大值。

## 题解 1 - typescript

- 编辑时间：2021.07.20
- 执行用时：200ms
- 内存消耗：48.3mb
- 编程语言：typescript
- 解法介绍：单调递减队列。

```typescript
class MaxQueue {
  private queue: number[] = [];
  private monoQueue: number[] = [];
  max_value(): number {
    if (this.queue.length === 0) return -1;
    return this.queue[this.monoQueue[0]];
  }
  push_back(value: number): void {
    this.queue.push(value);
    while (this.monoQueue.length && this.queue[this.monoQueue[this.monoQueue.length - 1]] < value)
      this.monoQueue.pop();
    this.monoQueue.push(this.queue.length - 1);
  }
  pop_front(): number {
    if (this.queue.length === 0) return -1;
    const v = this.queue.shift()!;
    for (let i = 0, n = this.monoQueue.length; i < n; i++) this.monoQueue[i]--;
    if (this.monoQueue[0] === -1) this.monoQueue.shift();
    return v;
  }
}
```
