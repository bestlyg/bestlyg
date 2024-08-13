/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '676. 实现一个魔法字典',
    url: 'https://leetcode.cn/problems/special-array-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `如果数组的每一对相邻元素都是两个奇偶性不同的数字，则该数组被认为是一个 特殊数组 。Aging 有一个整数数组 nums。如果 nums 是一个 特殊数组 ，返回 true，否则返回 false。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 239,
            memory: 20.96,
            desc: '字典树',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
