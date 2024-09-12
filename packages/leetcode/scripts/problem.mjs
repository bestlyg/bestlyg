/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2576. 求出最多标记下标',
    url: 'https://leetcode.cn/problems/find-the-maximum-number-of-marked-indices',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你执行上述操作任意次，返回 nums 中最多可以标记的下标数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 614,
            memory: 28.86,
            desc: '贪心，排序后从0和n//2两个位置依次向后匹配',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
