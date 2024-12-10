import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '1812. 判断国际象棋棋盘中一个格子的颜色',
    url: 'https://leetcode.cn/problems/available-captures-for-rook',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回白车将能 吃掉 的 卒的数量。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 0,
            memory:16.96,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
