/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3154. 到达第 K 级台阶的方案数',
    url: 'https://leetcode.cn/problems/find-number-of-ways-to-reach-the-k-th-stair',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 Alice 到达台阶 k 处的总方案数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 138,
            memory: 18.18,
            desc: 'dp遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
