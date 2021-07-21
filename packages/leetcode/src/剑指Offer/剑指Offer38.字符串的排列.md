---
title: 剑指 Offer 38. 字符串的排列
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

# 剑指 Offer 38. 字符串的排列

> 链接：[剑指 Offer 38. 字符串的排列](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/)  
> 难度：中等  
> 标签：回溯算法  
> 简介：输入一个字符串，打印出该字符串中字符的所有排列。

## 题解 1 - typescript

- 编辑时间：2021.06.22
- 执行用时：140ms
- 内存消耗：47.5mb
- 编程语言：typescript
- 解法介绍：全排列。

```typescript
function permutation(s: string): string[] {
  const list = new Set<string>();
  const dfs = (curStr: string = '', waitStr: string = s) => {
    if (waitStr.length === 1) {
      list.add(curStr + waitStr);
      return;
    }
    for (let i = 0, l = waitStr.length; i < l; i++) {
      const newCurStr = curStr + waitStr[i];
      const newWaitStr = waitStr.substring(0, i) + waitStr.substring(i + 1);
      dfs(newCurStr, newWaitStr);
    }
  };
  dfs();
  return [...list];
}
```
