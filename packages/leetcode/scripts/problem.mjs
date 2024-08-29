/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3142. 判断矩阵是否满足条件',
    url: 'https://leetcode.cn/problems/check-if-grid-satisfies-conditions',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `如果 所有 格子都满足以上条件，那么返回 true ，否则返回 false 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 38,
            memory: 16.24,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
