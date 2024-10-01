import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '983. 最低票价',
    url: 'https://leetcode.cn/problems/minimum-cost-for-tickets',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 你想要完成在给定的列表 days 中列出的每一天的旅行所需要的最低消费 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 47,
            memory: 18.82,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
