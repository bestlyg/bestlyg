---
title: 剑指 Offer 54. 二叉搜索树的第k大节点
order: 54
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 54. 二叉搜索树的第 k 大节点

> 链接：[剑指 Offer 54. 二叉搜索树的第 k 大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)  
> 难度：简单  
> 标签：树  
> 简介：给定一棵二叉搜索树，请找出其中第 k 大的节点。

## 题解 1 - typescript

- 编辑时间：2021.04.03
- 执行用时：104ms
- 内存消耗：44.5MB
- 编程语言：typescript
- 解法介绍：中序遍历后读取第 k 个值。

```typescript
function kthLargest(root: TreeNode | null, k: number): number {
  const arr: number[] = [];
  const inorder = (node: TreeNode | null): void => {
    if (!node) return;
    inorder(node.left);
    arr.push(node.val);
    inorder(node.right);
  };
  inorder(root);
  return arr[arr.length - k];
}
```

## 题解 2 - typescript

- 编辑时间：2021.04.03
- 执行用时：88ms
- 内存消耗：44.8MB
- 编程语言：typescript
- 解法介绍：统计右侧节点数进行计算。

```typescript
const countNode = (node: TreeNode | null): number =>
  node ? 1 + countNode(node.left) + countNode(node.right) : 0;
function kthLargest(root: TreeNode | null, k: number): number {
  if (!root) return 0;
  const rightCount = countNode(root.right) + 1;
  return rightCount > k
    ? kthLargest(root.right, k)
    : rightCount < k
    ? kthLargest(root.left, k - rightCount)
    : root.val;
}
```
