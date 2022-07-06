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

> 链接：[剑指 Offer II 029. 排序的循环链表](https://leetcode.cn/problems/4ueAj6/)  
> 难度：中等  
> 标签：链表  
> 简介：给定循环单调非递减列表中的一个点，写一个函数向这个列表中插入一个新元素 insertVal ，使这个列表仍然是循环升序的。

## 题解 1 - cpp

- 编辑时间：2022.06.18
- 执行用时：8ms
- 内存消耗：7.9MB
- 编程语言：cpp
- 解法介绍：遍历，考虑小于最小值和大于最大值。

```cpp
class Solution {
   public:
    Node* insert(Node* head, int insertVal) {
        if (!head) {
            Node* ans = new Node(insertVal);
            ans->next = ans;
            return ans;
        }
        Node *p = head, *node = new Node(insertVal);
        if (p->next != head) {
            int nmin = INT_MAX, nmax = INT_MIN;
            do {
                nmin = min(nmin, p->val);
                nmax = max(nmax, p->val);
                p = p->next;
            } while (p != head);
            if (nmin >= insertVal || nmax <= insertVal) {
                while (p->val <= p->next->val && p->next != head) p = p->next;
            } else {
                while (!(p->val <= insertVal && p->next->val >= insertVal))
                    p = p->next;
            }
        }
        node->next = p->next;
        p->next = node;
        return head;
    }
};
```
