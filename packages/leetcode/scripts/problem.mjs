import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2931. 购买物品的最大开销',
    url: 'https://leetcode.cn/problems/maximum-spending-after-buying-items',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回购买所有 m * n 件物品需要的 最大开销 。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time:175,
            memory: 27.46,
            desc: '贪心，每次找最便宜的',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
