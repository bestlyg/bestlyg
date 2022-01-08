---
title: 剑指 Offer II 029. 排序的循环链表
order: 29
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 029. 排序的循环链表

> 链接：[剑指 Offer II 029. 排序的循环链表](https://leetcode-cn.com/problems/4ueAj6/)  
> 难度：中等  
> 标签：链表  
> 简介：给定循环单调非递减列表中的一个点，写一个函数向这个列表中插入一个新元素 insertVal ，使这个列表仍然是循环升序的。

## 题解 1 - c++

- 编辑时间：2022.01.07
- 执行用时：8ms
- 内存消耗：8mb
- 编程语言：c++
- 解法介绍：遍历链表，找出符合前后的插入值，如果插入值大于最大值或小于最小值则直接插入到最大值后面。

```c++
class Solution {
   public:
    Node* insert(Node* head, int insertVal) {
        Node *p = head, *max_n = head;
        while (p) {
            if (p->val > p->next->val) max_n = p;
            if (p->val <= insertVal && p->next->val >= insertVal) break;
            if (p->next == head) {
                p = max_n;
                break;
            }
            p = p->next;
        }
        if (p) {
            p->next = new Node(insertVal, p->next);
        } else {
            head = new Node(insertVal);
            head->next = head;
        }
        return head;
    }
};
```
