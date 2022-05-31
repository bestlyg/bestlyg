---
title: 剑指 Offer II 114. 外星文字典
order: 114
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 114. 外星文字典
    
> 链接：[剑指 Offer II 114. 外星文字典](https://leetcode.cn/problems/Jf1JuT/)  
> 难度：困难  
> 标签：深度优先搜索、广度优先搜索、图、拓扑排序、数组、字符串  
> 简介：请你根据该词典还原出此语言中已知的字母顺序，并 按字母递增顺序 排列。若不存在合法字母顺序，返回 "" 。若存在多种可能的合法字母顺序，返回其中 任意一种 顺序即可。
      
## 题解 1 - typescript
- 编辑时间：2022.05.31
- 执行用时：84ms
- 内存消耗：45.8MB
- 编程语言：typescript
- 解法介绍：拓扑排序+bfs。
```typescript
class MyNode {
        next = new Set<MyNode>();
        parent = new Set<MyNode>();
        constructor(public val: string) {}
      }
      function alienOrder(words: string[]): string {
        const map = new Map<string, MyNode>();
        const n = words.length;
        let error = false;
        for (let i = 0; i < n; i++) {
          for (const ch of words[i]) {
            if (!map.has(ch)) map.set(ch, new MyNode(ch));
          }
          if (i >= 1) comp(i - 1, i);
          if (error) return '';
        }
        const q: MyNode[] = [];
        for (const node of map.values()) {
          if (node.parent.size === 0) q.push(node);
        }
        const set = new Set<MyNode>();
        let ans = '';
        while (q.length) {
          const node = q.shift()!;
          if (set.has(node)) continue;
          set.add(node);
          ans += node.val;
          for (const child of node.next) {
            child.parent.delete(node);
            if (child.parent.size === 0) {
              q.push(child);
            }
          }
        }
        if (ans.length !== map.size) return '';
        return ans;
        function comp(idx1: number, idx2: number) {
          const word1 = words[idx1];
          const word2 = words[idx2];
          const n = Math.min(word1.length, word2.length);
          for (let i = 0; i < n; i++) {
            if (word1[i] !== word2[i]) {
              const n1 = map.get(word1[i])!;
              const n2 = map.get(word2[i])!;
              n1.next.add(n2);
              n2.parent.add(n1);
              return;
            }
          }
          if (word1.length > word2.length) error = true;
        }
      }
      
```

      