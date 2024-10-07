import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '871. 最低加油次数',
    url: 'https://leetcode.cn/problems/minimum-number-of-refueling-stops',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `为了到达目的地，汽车所必要的最低加油次数是多少？如果无法到达目的地，则返回 -1 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 52,
            memory: 16.74,
            desc: '贪心，每次走到最大距离时，加一次最多的加油站的油',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
