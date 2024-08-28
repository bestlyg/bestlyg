/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3144. 分割字符频率相等的最少子字符串',
    url: 'https://leetcode.cn/problems/minimum-substring-partition-of-equal-character-frequency',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 s 最少 能分割成多少个平衡子字符串。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 9615,
            memory: 16.46,
            desc: 'dp[i]表示以i字符结尾时的最少分割数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
