/**
 * @typedef {import("./types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, codePath } from './utils.mjs';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1035. 不相交的线',
    url: 'https://leetcode.cn/problems/uncrossed-lines',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `以这种方法绘制线条，并返回可以绘制的最大连线数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 169,
            memory: 23.70,
            desc: '记忆话dfs遍历所有不想交的可能',
            code: await fs.readFile(codePath, 'utf8'),
        },
    ],
};
