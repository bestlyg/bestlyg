/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3174. 清除数字',
    url: 'https://leetcode.cn/problems/clear-digits',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回删除所有数字字符以后剩下的字符串。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 43,
            memory: 16.43,
            desc: '每次找到数字后删除并递归',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
