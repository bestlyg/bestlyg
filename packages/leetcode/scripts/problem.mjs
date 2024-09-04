/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2860. 让所有学生保持开心的分组方法数',
    url: 'https://leetcode.cn/problems/happy-students',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回能够满足让所有学生保持开心的分组方法的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 100,
            memory: 26.37,
            desc: '排序后遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
