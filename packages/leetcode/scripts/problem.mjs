/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3117. 划分数组得到最小的值之和',
    url: 'https://leetcode.cn/problems/minimum-sum-of-values-by-dividing-array',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回将 nums 划分为 m 个子数组所能得到的可能的 最小 子数组 值 之和。如果无法完成这样的划分，则返回 -1 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 1329,
            memory: 419.88,
            desc: 'dfs记录当前遍历到的两个数组下标和当前记录的与值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
