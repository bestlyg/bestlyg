/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3146. 两个字符串的排列差',
    url: 'https://leetcode.cn/problems/permutation-difference-between-two-strings',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你两个字符串 s 和 t，每个字符串中的字符都不重复，且 t 是 s 的一个排列。排列差 定义为 s 和 t 中每个字符在两个字符串中位置的绝对差值之和。返回 s 和 t 之间的 排列差 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 44,
            memory: 16.5,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
