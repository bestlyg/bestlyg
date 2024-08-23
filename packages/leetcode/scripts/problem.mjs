/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3007. 价值和小于等于 K 的最大数字',
    url: 'https://leetcode.cn/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `num 的 累加价值 是从 1 到 num 的数字的 总 价值。如果 num 的累加价值小于或等于 k 则被认为是 廉价 的。请你返回 最大 的廉价数字。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 387,
            memory: 24.11,
            desc: '二分快速计算，利用数位dp求一个数的累加值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
