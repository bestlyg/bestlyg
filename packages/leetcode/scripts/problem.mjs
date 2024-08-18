/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '551. 学生出勤记录 I',
    url: 'https://leetcode.cn/problems/minimum-number-of-operations-to-make-word-k-periodic',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回使 word 成为 K 周期字符串 所需的 最少 操作次数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 36,
            memory: 16.42,
            desc: '遍历字符串',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
