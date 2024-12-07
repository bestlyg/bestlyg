import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '999. 可以被一步捕获的棋子数',
    url: 'https://leetcode.cn/problems/available-captures-for-rook',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回白车将能 吃掉 的 卒的数量。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 119,
            memory: 26.6,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
