/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2708. 一个小组的最大实力值',
    url: 'https://leetcode.cn/problems/maximum-strength-of-a-group',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回老师创建的小组能得到的最大实力值为多少。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 46,
            memory: 16.51,
            desc: '排序后拿所有的正书和成对拿负数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
