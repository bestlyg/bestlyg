/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '698. 划分为k个相等的子集',
    url: 'https://leetcode.cn/problems/partition-to-k-equal-sum-subsets',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 521,
            memory: 48.65,
            desc: '记忆化递归，同时利用二进制记录是否被使用',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
