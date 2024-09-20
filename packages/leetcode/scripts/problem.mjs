/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2376. 统计特殊整数',
    url: 'https://leetcode.cn/problems/count-special-integers',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `如果一个正整数每一个数位都是 互不相同 的，我们称它是 特殊整数 。给你一个 正 整数 n ，请你返回区间 [1, n] 之间特殊整数的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 349,
            memory: 35.45,
            desc: '数位DP' ,
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
