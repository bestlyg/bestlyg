/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3148. 矩阵中的最大得分',
    url: 'https://leetcode.cn/problems/maximum-difference-score-in-a-grid',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个由 正整数 组成、大小为 m x n 的矩阵 grid。你可以从矩阵中的任一单元格移动到另一个位于正下方或正右侧的任意单元格（不必相邻）。从值为 c1 的单元格移动到值为 c2 的单元格的得分为 c2 - c1 。你可以从 任一 单元格开始，并且必须至少移动一次。返回你能得到的 最大 总得分。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 399,
            memory: 28.66,
            desc: 'dp[i][j]表示以grid[i-1][j-1]为右下角顶点时，区间内的最小值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
