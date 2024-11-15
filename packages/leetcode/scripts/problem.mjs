import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3239. 最少翻转次数使二进制矩阵回文 I',
    url: 'https://leetcode.cn/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 最少 翻转次数，使得矩阵 要么 所有行是 回文的 ，要么所有列是 回文的 。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 147,
            memory: 56.16,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
