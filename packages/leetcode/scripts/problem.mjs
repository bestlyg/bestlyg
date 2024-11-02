import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3259. 超级饮料的最大强化能量',
    url: 'https://leetcode.cn/problems/maximum-energy-boost-from-two-drinks',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回在接下来的 n 小时内你能获得的 最大 总强化能量。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            date: '2024-11-01',
            time: 1121,
            memory: 426.5,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
