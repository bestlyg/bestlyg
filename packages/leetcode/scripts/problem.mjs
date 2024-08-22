/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3133. 数组最后一个元素的最小值',
    url: 'https://leetcode.cn/problems/minimum-array-end',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 nums[n - 1] 可能的 最小 值。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 31,
            memory: 16.3,
            desc: '把两个字符串进行拼接，在保留原有x的二进制位的基础上增加n的遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
