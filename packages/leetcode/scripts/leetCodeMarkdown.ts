import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3128. 直角三角形',
    url: 'https://leetcode.cn/problems/right-triangles',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个二维 boolean 矩阵 grid 。请你返回使用 grid 中的 3 个元素可以构建的 直角三角形 数目，且满足 3 个元素值 都 为 1 。`,
    solutions: [
        // {
        //     date: new Date('2020.11.11').getTime(),
        //     script: Script.JS,
        //     time: 140,
        //     memory: 45.82,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.07.25').getTime(),
        //     script: Script.TS,
        //     time: 188,
        //     memory: 39.68,
        //     desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
        //     code: ``,
        // },

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 476,
            memory: 44.82,
            desc: '遍历每一个1，查找垂直和水平方向上的所有的其他1的个数',
            code: `class Solution:
    def numberOfRightTriangles(self, grid: List[List[int]]) -> int:
        n = len(grid)
        m = len(grid[0])
        rows = [sum(grid[i][j] for j in range(m)) for i in range(n)]
        cols = [sum(grid[i][j] for i in range(n)) for j in range(m)]
        return sum(
            (rows[i] - 1) * (cols[j] - 1)
            for i in range(n)
            for j in range(m)
            if grid[i][j]
        )`,
        },
        // {
        //     script: Script.RUST,
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
