# 剑指 Offer 09. 用两个栈实现队列

> 链接：[剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)  
> 难度：简单  
> 标签：栈、设计  
> 简介：用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。

## 题解 1 - typescript

- 编辑时间：2020.6.30
- 执行用时：464ms
- 内存消耗：47.9MB
- 编程语言：typescript
- 解法介绍：入队则直接入栈，出队时判断 out 栈是否为空，为空的话把 in 栈出栈到 out 栈。

```typescript
class CQueue {
  inStack: number[] = [];
  outStack: number[] = [];
  appendTail(value: number): void {
    this.inStack.push(value);
  }
  deleteHead(): number {
    if (this.outStack.length === 0) {
      if (this.inStack.length === 0) return -1;
      while (this.inStack.length !== 0) this.outStack.push(this.inStack.pop()!);
    }
    return this.outStack.pop()!;
  }
}
```
