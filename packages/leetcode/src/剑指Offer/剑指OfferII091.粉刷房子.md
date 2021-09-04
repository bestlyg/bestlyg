---
title: 剑指 Offer II 091. 粉刷房子
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

# 剑指 Offer II 091. 粉刷房子
    
> 链接：[剑指 Offer II 091. 粉刷房子](https://leetcode-cn.com/problems/JEj789/)  
> 难度：中等  
> 标签：数组、动态规划  
> 简介：请计算出粉刷完所有房子最少的花费成本。
      
## 题解 1 - typescript
- 编辑时间：2021.09.03
- 执行用时：108ms
- 内存消耗：40.5mb
- 编程语言：typescript
- 解法介绍：动态规划。
```typescript
function minCost(costs: number[][]): number {
        const n = costs.length;
        const dp: number[][] = new Array(2).fill(0).map(_ => new Array(3).fill(Infinity));
        for (let i = 0; i < 3; i++) dp[0][i] = costs[0][i];
        for (let i = 1; i < n; i++) {
          const idx = i % 2;
          const prevIdx = idx ^ 1;
          dp[idx][0] = Math.min(dp[prevIdx][1], dp[prevIdx][2]) + costs[i][0];
          dp[idx][1] = Math.min(dp[prevIdx][0], dp[prevIdx][2]) + costs[i][1];
          dp[idx][2] = Math.min(dp[prevIdx][1], dp[prevIdx][0]) + costs[i][2];
        }
        return Math.min(...dp[(n - 1) % 2]);
      }
```

      