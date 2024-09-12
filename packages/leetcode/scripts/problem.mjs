/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2555. 两个线段获得的最多奖品',
    url: 'https://leetcode.cn/problems/maximize-win-from-two-segments',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回在选择两个最优线段的前提下，可以获得的 最多 奖品数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 614,
            memory: 28.86,
            desc: '遍历所有区间，并且统计非区间内的最大值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
