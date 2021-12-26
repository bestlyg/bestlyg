---
title: 剑指 Offer 26. 树的子结构
order: 26
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 300000
---

# 剑指 Offer 26. 树的子结构

> 链接：[剑指 Offer 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)  
> 难度：中等  
> 标签：树  
> 简介：输入两棵二叉树 A 和 B，判断 B 是不是 A 的子结构。

## 题解 1 - typescript

- 编辑时间：2021.04.03
- 执行用时：144ms
- 内存消耗：58.2mb
- 编程语言：typescript
- 解法介绍：依次比较所有值。

```typescript
function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
  if (!A || !B) return false;
  if (A.val === B.val) {
    if (
      (!B.left && !B.right) ||
      (!B.left && A.right?.val === B.right?.val && isSubStructure(A.right, B.right)) ||
      (!B.right && A.left?.val === B.left?.val && isSubStructure(A.left, B.left)) ||
      (A.right?.val === B.right?.val &&
        A.left?.val === B.left?.val &&
        isSubStructure(A.left, B.left) &&
        isSubStructure(A.right, B.right))
    )
      return true;
    return isSubStructure(A.left, B) || isSubStructure(A.right, B);
  } else {
    return isSubStructure(A.left, B) || isSubStructure(A.right, B);
  }
}
```

## 题解 2 - typescript

- 编辑时间：2021.04.03
- 执行用时：144ms
- 内存消耗：58.1mb
- 编程语言：typescript
- 解法介绍：利用辅助检测判断是否相等。

```typescript
const check = (A: TreeNode | null, B: TreeNode | null): boolean => {
  if (!B) return true;
  if (!A) return false;
  return A.val === B.val && check(A.left, B.left) && check(A.right, B.right);
};
function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
  if (!A || !B) return false;
  if (check(A, B)) return true;
  return isSubStructure(A.left, B) || isSubStructure(A.right, B);
}
```
