---
title: 剑指 Offer 22. 链表中倒数第k个节点
order: 22
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 22. 链表中倒数第 k 个节点

> 链接：[剑指 Offer 22. 链表中倒数第 k 个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)  
> 难度：简单  
> 标签：链表、双指针  
> 简介：输入一个链表，输出该链表中倒数第 k 个节点。为了符合大多数人的习惯，本题从 1 开始计数，即链表的尾节点是倒数第 1 个节点。

## 题解 1 - typescript

- 编辑时间：2021.09.02
- 执行用时：72ms
- 内存消耗：39.5MB
- 编程语言：typescript
- 解法介绍：计算总长度相减后 dfs。

```typescript
function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
  let count = 0;
  let p = head;
  while (p !== null) {
    count++;
    p = p.next;
  }
  return dfs(head, count - k);
  function dfs(node: ListNode | null, count: number): ListNode | null {
    if (node === null) return null;
    if (count === 0) return node;
    return dfs(node.next, count - 1);
  }
}
```

## 题解 2 - typescript

- 编辑时间：2021.09.02
- 执行用时：80ms
- 内存消耗：39.4MB
- 编程语言：typescript
- 解法介绍：双指针。

```typescript
function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
  let slow = head;
  let fast = head;
  while (fast && k) {
    fast = fast.next;
    k--;
  }
  while (fast) {
    fast = fast.next;
    slow = slow!.next;
  }
  return slow;
}
```
