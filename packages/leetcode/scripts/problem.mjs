/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '1184. 公交站间的距离',
    url: 'https://leetcode.cn/problems/removing-stars-from-a-string',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回移除 所有 星号之后的字符串。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 44,
            memory: 17.34,
            desc: '向左遍历和向右遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
