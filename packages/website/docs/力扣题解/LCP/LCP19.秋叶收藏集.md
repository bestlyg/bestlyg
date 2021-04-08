# LCP 19. 秋叶收藏集

> 链接：[LCP 19. 秋叶收藏集](https://leetcode-cn.com/problems/UlBDOe/)  
> 难度：中等  
> 标签：  
> 简介：小扣出去秋游，途中收集了一些红叶和黄叶，他利用这些叶子初步整理了一份秋叶收藏集 leaves， 字符串 leaves 仅包含小写字符 r 和 y， 其中字符 r 表示一片红叶，字符 y 表示一片黄叶。出于美观整齐的考虑，小扣想要将收藏集中树叶的排列调整成「红、黄、红」三部分。每部分树叶数量可以不相等，但均需大于等于 1。每次调整操作，小扣可以将一片红叶替换成黄叶或者将一片黄叶替换成红叶。请问小扣最少需要多少次调整操作才能将秋叶收藏集调整完毕。

## 题解 1 - typescript

- 编辑时间：2020.10.1
- 执行用时：688ms
- 内存消耗：70.4mb
- 编程语言：typescript
- 解法介绍：[参考链接](https://leetcode-cn.com/problems/UlBDOe/solution/qiu-xie-shou-cang-ji-by-leetcode-solution/)。

```typescript
function minimumOperations(leaves: string): number {
  const len = leaves.length;
  const check = (i: number, type: 'r' | 'y') => (leaves[i] === type ? 1 : 0);
  const isRed = (i: number) => check(i, 'r');
  const isYellow = (i: number) => check(i, 'y');
  const dp: number[][] = new Array(len).fill(0).map(_ => new Array(3).fill(0));
  dp[0][0] = isYellow(0);
  dp[0][1] = dp[0][2] = dp[1][2] = Infinity;
  for (let i = 1; i < len; i++) {
    dp[i][0] = dp[i - 1][0] + isYellow(i);
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][1]) + isRed(i);
    if (i >= 2) dp[i][2] = Math.min(dp[i - 1][1], dp[i - 1][2]) + isYellow(i);
  }
  return dp[len - 1][2];
}
```
