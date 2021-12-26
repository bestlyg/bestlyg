---
title: 剑指 Offer II 067. 最大的异或
order: 67
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 067. 最大的异或

> 链接：[剑指 Offer II 067. 最大的异或](https://leetcode-cn.com/problems/ms70jA/)  
> 难度：中等  
> 标签：位运算、字典树、数组、哈希表  
> 简介：给定一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。

## 题解 1 - typescript

- 编辑时间：2021.10.25
- 执行用时：784ms
- 内存消耗：67.3mb
- 编程语言：typescript
- 解法介绍：二叉字典树。

```typescript
const MAX = 31;
class BitTrieNode {
  // 0
  left: BitTrieNode | null = null;
  // 1
  right: BitTrieNode | null = null;
  val = -1;
}
class BitTrie {
  root = new BitTrieNode();
  add(num: number) {
    const str = num.toString(2).padStart(MAX, '0');
    let node = this.root;
    for (let i = 0, l = str.length; i < l; i++) {
      const ch = str[i];
      if (ch === '0') node = node.left ?? (node.left = new BitTrieNode());
      else node = node.right ?? (node.right = new BitTrieNode());
    }
    node.val = num;
  }
  find(num: number) {
    const str = num.toString(2).padStart(MAX, '0');
    let node = this.root;
    for (let i = 0, l = str.length; i < l; i++) {
      if (!node.left && !node.right) break;
      const ch = str[i];
      if (ch === '0') {
        node = node.right ?? node.left!;
      } else {
        node = node.left ?? node.right!;
      }
    }
    return node;
  }
}
function findMaximumXOR(nums: number[]): number {
  const trie = new BitTrie();
  nums.forEach(num => trie.add(num));
  trie.find(5).val;
  let ans = -Infinity;
  nums.forEach(num => {
    ans = Math.max(ans, trie.find(num).val ^ num);
  });
  return ans;
}
```
