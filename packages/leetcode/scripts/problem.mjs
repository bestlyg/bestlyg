import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3240. 最少翻转次数使二进制矩阵回文 II',
    url: 'https://leetcode.cn/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 最少 翻转次数，使得矩阵中 所有 行和列都是 回文的 ，且矩阵中 1 的数目可以被 4 整除 。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 230,
            memory: 56.31,
            desc: '分类讨论',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
