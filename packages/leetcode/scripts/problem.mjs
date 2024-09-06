/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3176. 求出最长好子序列 I',
    url: 'https://leetcode.cn/problems/find-the-maximum-length-of-a-good-subsequence-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回删除所有数字字符以后剩下的字符串。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 7064,
            memory: 16.84,
            desc: 'dp[i][k]表示以i下标为最后一个元素，在不超过k个约束的情况下的最大长度',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
