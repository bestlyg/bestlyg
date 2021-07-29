---
title: 剑指 Offer 36. 二叉搜索树与双向链表
order: NaN
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 200000
---

# 剑指 Offer 36. 二叉搜索树与双向链表

> 链接：[剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)  
> 难度：中等  
> 标签：栈、树、深度优先搜索、二叉搜索树、链表、二叉树、双向链表  
> 简介：输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。

## 题解 1 - javascript

- 编辑时间：2021.07.29
- 执行用时：84ms
- 内存消耗：39.3mb
- 编程语言：javascript
- 解法介绍：中序遍历。

```javascript
var treeToDoublyList = function (root) {
  if (root === null) return null;
  let head, pre;
  inorder(root);
  head.left = pre;
  pre.right = head;
  return head;
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (!pre) {
      head = node;
    } else {
      pre.right = node;
    }
    node.left = pre;
    pre = node;
    inorder(node.right);
  }
};
```
