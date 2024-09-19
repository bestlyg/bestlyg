/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2332. 坐上公交的最晚时间',
    url: 'https://leetcode.cn/problems/the-latest-time-to-catch-a-bus',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回你可以搭乘公交车的最晚到达公交站时间。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 242,
            memory: 34.53,
            desc: '贪心的认为1.最迟的时间，一定是某一个行人的前一个2.如果公交车没上满人，那就是公交车的到达时间是最晚时间' ,
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
