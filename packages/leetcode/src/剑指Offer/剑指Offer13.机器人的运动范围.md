---
title: 剑指 Offer 13. 机器人的运动范围
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

# 剑指 Offer 13. 机器人的运动范围
    
> 链接：[剑指 Offer 13. 机器人的运动范围](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)  
> 难度：中等  
> 标签：广度优先搜索、数组、矩阵  
> 简介：给你一个 n x n 的二进制矩阵 grid 中，返回矩阵中最短 畅通路径 的长度。如果不存在这样的路径，返回 -1 。
      
## 题解 1 - typescript
- 编辑时间：2021.07.25
- 执行用时：92ms
- 内存消耗：43.9mb
- 编程语言：typescript
- 解法介绍：bfs。
```typescript
function movingCount(m: number, n: number, k: number): number {
        const queue: [number, number, number][] = [[0, 0, 1]];
        const format = (row: number, col: number) => [object Object]${row}::${col}[object Object];
        const set = new Set(queue.map(([row, col]) => format(row, col)));
        let ans = 1;
        const add = (row: number, col: number, count: number) => {
          const str = format(row, col);
          if (set.has(str)) return;
          set.add(str);
          const data: [number, number, number] = [row, col, count];
          let num = 0;
          while (row) {
            num += row % 10;
            row = ~~(row / 10);
          }
          while (col) {
            num += col % 10;
            col = ~~(col / 10);
          }
          if (num > k) return;
          queue.push(data);
          ans++;
        };
        while (queue.length) {
          const [row, col, count] = queue.shift()!;
          if (row) if (row > 0) add(row - 1, col, count + 1);
          if (col > 0) add(row, col - 1, count + 1);
          if (row < n - 1) add(row + 1, col, count + 1);
          if (col < m - 1) add(row, col + 1, count + 1);
        }
        return ans;
      }
```

      