---
title: 剑指 Offer 37. 序列化二叉树
order: 37
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 37. 序列化二叉树

> 链接：[剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)  
> 难度：困难  
> 标签：广度优先搜索、深度优先搜索、树、设计、字符串、二叉树  
> 简介：请实现两个函数，分别用来序列化和反序列化二叉树。

## 题解 1 - typescript

- 编辑时间：2021.06.30
- 执行用时：152ms
- 内存消耗：48.1MB
- 编程语言：typescript
- 解法介绍：利用 JSON 化。

```typescript
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  return JSON.stringify(root);
};
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  return JSON.parse(data);
};
```
