---
title: 剑指 Offer 52. 两个链表的第一个公共节点
order: 52
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 52. 两个链表的第一个公共节点

> 链接：[剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)  
> 难度：简单  
> 标签：哈希表、链表、双指针  
> 简介：输入两个链表，找出它们的第一个公共节点。

## 题解 1 - typescript

- 编辑时间：2021.07.21
- 执行用时：112ms
- 内存消耗：45.5MB
- 编程语言：typescript
- 解法介绍：利用 set 储存每个节点。

```typescript
var getIntersectionNode = function (headA, headB) {
  const set = new Set();
  let p = headA;
  while (p) {
    set.add(p);
    p = p.next;
  }
  p = headB;
  while (p) {
    if (set.has(p)) return p;
    p = p.next;
  }
  return null;
};
```

## 题解 2 - typescript

- 编辑时间：2021.07.21
- 执行用时：88ms
- 内存消耗：45.1mb
- 编程语言：typescript
- 解法介绍：双指针。

```typescript
var getIntersectionNode = function (headA, headB) {
  let pA = headA;
  let pB = headB;
  if (!pA || !pB) return null;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
};
```
