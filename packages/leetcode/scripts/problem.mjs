/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3127. 构造相同颜色的正方形',
    url: 'https://leetcode.cn/problems/make-a-square-with-the-same-color',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `你的任务是改变 至多一个 格子的颜色，使得矩阵中存在一个 2 x 2 颜色完全相同的正方形。如果可以得到一个相同颜色的 2 x 2 正方形，那么返回 true ，否则返回 false 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 37,
            memory: 16.36,
            desc: '遍历所有可能，判断以它为左上角点的四个方格是否存在3个相同颜色',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
