---
title: 剑指 Offer II 091. 粉刷房子
order: 91
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指OfferII
  path: /剑指OfferII
  order: 400000
---

# 剑指 Offer II 091. 粉刷房子

> 链接：[剑指 Offer II 091. 粉刷房子](https://leetcode-cn.com/problems/JEj789/)  
> 难度：中等  
> 标签：数组、动态规划  
> 简介：请计算出粉刷完所有房子最少的花费成本。

## 题解 1 - typescript

- 编辑时间：2021.09.03
- 执行用时：108ms
- 内存消耗：40.5MB
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

## 题解 2 - cpp

- 编辑时间：2022.06.25
- 执行用时：8ms
- 内存消耗：9.6MB
- 编程语言：cpp
- 解法介绍：dp。

```cpp
class Solution {
   public:
    int minCost(vector<vector<int>>& costs) {
        int n = costs.size(), ans = INT_MAX;
        vector<vector<int>> dp(3, vector<int>(n, 0));
        for (int i = 0; i < 3; i++) dp[i][0] = costs[0][i];
        for (int j = 1; j < n; j++) {
            dp[0][j] = min(dp[1][j - 1], dp[2][j - 1]) + costs[j][0];
            dp[1][j] = min(dp[0][j - 1], dp[2][j - 1]) + costs[j][1];
            dp[2][j] = min(dp[0][j - 1], dp[1][j - 1]) + costs[j][2];
        }
        for (int i = 0; i < 3; i++) ans = min(ans, dp[i][n - 1]);
        return ans;
    }
};
```
