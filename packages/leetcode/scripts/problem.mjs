import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1547. 切棍子的最小成本',
    url: 'https://leetcode.cn/problems/minimum-cost-to-cut-a-stick',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回切棍子的 最小总成本 。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 942,
            memory: 19.98,
            desc: 'dfs尝试在每一个点进行切割',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
