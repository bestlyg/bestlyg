import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '825. 适龄的朋友',
    url: 'https://leetcode.cn/problems/friends-of-appropriate-ages',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 最少 翻转次数，使得矩阵中 所有 行和列都是 回文的 ，且矩阵中 1 的数目可以被 4 整除 。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 205,
            memory: 17.11,
            desc: '对于每个用户进行二分查找合适的区间',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
