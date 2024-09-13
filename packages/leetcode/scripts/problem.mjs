/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2398. 预算内的最多机器人数目',
    url: 'https://leetcode.cn/problems/maximum-number-of-robots-within-budget',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回在 不超过 budget 的前提下，你 最多 可以 连续 运行的机器人数目为多少。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 1296,
            memory: 24.51,
            desc: '由于连续，遍历所有可行区间，并记录当前区间内的最大值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
