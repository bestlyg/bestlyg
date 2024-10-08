import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '1436. 旅行终点站',
    url: 'https://leetcode.cn/problems/minimum-number-of-refueling-stops',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `为了到达目的地，汽车所必要的最低加油次数是多少？如果无法到达目的地，则返回 -1 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 43,
            memory: 16.3,
            desc: '哈希存储',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
