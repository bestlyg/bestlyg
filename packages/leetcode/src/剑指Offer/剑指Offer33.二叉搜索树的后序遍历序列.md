---
title: 剑指 Offer 33. 二叉搜索树的后序遍历序列
order: 33
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 33. 二叉搜索树的后序遍历序列

> 链接：[剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)  
> 难度：中等  
> 标签：栈、树、二叉搜索树、递归、二叉树、单调栈  
> 简介：输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

## 题解 1 - typescript

- 编辑时间：2021.08.07
- 执行用时：72ms
- 内存消耗：39.9mb
- 编程语言：typescript
- 解法介绍：验证左边是否都小于中值，右边是否都大于中值。

```typescript
function verifyPostorder(postorder: number[]): boolean {
  const n = postorder.length;
  if (n === 0) return true;
  const mid = postorder[n - 1];
  let i = 0;
  for (; i < n - 1; i++) if (postorder[i] > mid) break;
  for (let j = i; j < n - 1; j++) if (postorder[j] < mid) return false;
  return verifyPostorder(postorder.slice(0, i)) && verifyPostorder(postorder.slice(i, n - 1));
}
```
