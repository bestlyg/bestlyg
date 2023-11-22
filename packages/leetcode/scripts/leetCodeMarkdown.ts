import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2304. 网格中的最小路径代价',
    url: 'https://leetcode.cn/problems/minimum-path-cost-in-a-grid',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `从 第一行 任意单元格出发，返回到达 最后一行 任意单元格的最小路径代价。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 296,
            memory: 21.95,
            desc: 'dp[i][j]表示到ij时的最小开销。',
            code: `class Solution:
    def minPathCost(self, grid: List[List[int]], moveCost: List[List[int]]) -> int:
        n = len(grid)
        m = len(grid[0])
        dp = [[inf] * m for _ in range(n)]
        for j in range(m): dp[0][j] = grid[0][j]
        for i in range(1, n):
            for j in range(m):
                dp[i][j] = grid[i][j] + min(moveCost[grid[i - 1][k]][j] + dp[i - 1][k] for k in range(m))
        return min(dp[n - 1])`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
