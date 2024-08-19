/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '552. 学生出勤记录 II',
    url: 'https://leetcode.cn/problems/minimum-number-of-operations-to-make-word-k-periodic',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个整数 n ，表示出勤记录的长度（次数）。请你返回记录长度为 n 时，可能获得出勤奖励的记录情况 数量 。答案可能很大，所以返回对 109 + 7 取余 的结果。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 690,
            memory: 16.39,
            desc: 'dp遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
