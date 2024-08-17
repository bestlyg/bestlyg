/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3137. K 周期字符串需要的最少操作次数',
    url: 'https://leetcode.cn/problems/minimum-number-of-operations-to-make-word-k-periodic',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回使 word 成为 K 周期字符串 所需的 最少 操作次数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 102,
            memory: 19.83,
            desc: '遍历后统计频率最高的子串',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
