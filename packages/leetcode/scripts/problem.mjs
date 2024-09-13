/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2390. 从字符串中移除星号',
    url: 'https://leetcode.cn/problems/removing-stars-from-a-string',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回移除 所有 星号之后的字符串。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 125,
            memory: 17.75,
            desc: '遍历时用栈存储',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
