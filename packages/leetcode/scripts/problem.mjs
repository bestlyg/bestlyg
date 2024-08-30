/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3153. 所有数对中数位不同之和',
    url: 'https://leetcode.cn/problems/sum-of-digit-differences-of-all-pairs',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 nums 中 所有 整数对里，数位不同之和。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 645,
            memory: 30.79,
            desc: '遍历时记录前面每一个数位存在的不同字符数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
