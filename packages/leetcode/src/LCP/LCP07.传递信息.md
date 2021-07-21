---
title: LCP 07. 传递信息
order: 7
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: LCP
  path: /LCP
  order: 300000
---

# LCP 07. 传递信息

> 链接：[LCP 07. 传递信息](https://leetcode-cn.com/problems/chuan-di-xin-xi/)  
> 难度：简单  
> 标签：广度优先搜索、深度优先搜索、图、动态规划  
> 简介：给定总玩家数 n，以及按 [玩家编号,对应可传递玩家编号] 关系组成的二维数组 relation。返回信息从小 A (编号 0 ) 经过 k 轮传递到编号为 n-1 的小伙伴处的方案数；若不能到达，返回 0。

## 题解 1 - typescript

- 编辑时间：2021.07.01
- 执行用时：104ms
- 内存消耗：41.5mb
- 编程语言：typescript
- 解法介绍：储存每个伙伴的下一个伙伴。

```typescript
function numWays(n: number, relation: number[][], k: number): number {
  const nextPartnerMap = new Map<number, Set<number>>();
  for (const [cur, next] of relation) {
    let set = nextPartnerMap.get(cur);
    if (!set) nextPartnerMap.set(cur, (set = new Set()));
    set.add(next);
  }
  let list = [0];
  while (k--) {
    list = list
      .map(item => (nextPartnerMap.has(item) ? [...nextPartnerMap.get(item)!] : []))
      .flat();
  }
  return list.filter(v => v === n - 1).length;
}
```
