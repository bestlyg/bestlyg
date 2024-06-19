import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2713. 矩阵中严格递增的单元格数',
    url: 'https://leetcode.cn/problems/maximum-strictly-increasing-cells-in-a-matrix',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你找出从某个单元开始访问矩阵所能访问的 单元格的最大数量 。`,
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
            time: 1089,
            memory: 71.42,
            desc: '根据数值进行统计后dp',
            code: `class Solution:
    def maxIncreasingCells(self, mat: List[List[int]]) -> int:
        n = len(mat)
        m = len(mat[0])
        rows = [0] * n
        cols = [0] * m
        map = defaultdict(list)
        for i in range(n):
            for j in range(m):
                map[mat[i][j]].append((i, j))
        for _, arr in sorted(map.items(), key = lambda item: item[0]):
            varr = [max(rows[i], cols[j]) + 1 for i, j in arr]
            for (i, j), v in zip(arr, varr):
                rows[i] = max(rows[i], v)
                cols[j] = max(cols[j], v)
        return max(rows)`,
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
