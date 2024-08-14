/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3152. 特殊数组 II',
    url: 'https://leetcode.cn/problems/special-array-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回布尔数组 answer，如果 nums[fromi..toi] 是特殊数组，则 answer[i] 为 true ，否则，answer[i] 为 false 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 226,
            memory: 47.38,
            desc: '前缀和',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
