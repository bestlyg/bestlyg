---
title: 剑指 Offer II 053. 二叉搜索树中的中序后继
order: 53
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 200000
---

# 剑指 Offer II 053. 二叉搜索树中的中序后继

> 链接：[剑指 Offer II 053. 二叉搜索树中的中序后继](https://leetcode-cn.com/problems/P5rCT8/)  
> 难度：中等  
> 标签：树、深度优先搜索、二叉搜索树、二叉树  
> 简介：给定一棵二叉搜索树和其中的一个节点 p ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 null 。

## 题解 1 - typescript

- 编辑时间：2021.08.14
- 执行用时：96ms
- 内存消耗：48.1mb
- 编程语言：typescript
- 解法介绍：中序遍历。

```typescript
function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
  if (p === null || root === null) return null;
  let prev: TreeNode | null = null;
  let ans: TreeNode | null = null;
  inorder(root);
  return ans;
  function inorder(node: TreeNode | null): boolean {
    if (node === null) return false;
    if (inorder(node.left)) return true;
    if (prev === p) {
      ans = node;
      return true;
    }
    prev = node;
    if (inorder(node.right)) return true;
    return false;
  }
}
```
