/**
 * @typedef {import("@bestlyg/data").prismaClient.LeetcodeProblem} Problem
 * @typedef {import("@bestlyg/data").prismaClient.LeetcodeSolution} Solution
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem & {solutions:Solution[]}} */
export const problem = {
    exist: true,
    name: '598. 区间加法 II',
    url: 'https://leetcode.cn/problems/range-addition-ii',
    level: 'Easy',
    tagList: [],
    desc: `在 执行完所有操作后 ，计算并返回 矩阵中最大整数的个数 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3,
            memory: 18.84,
            desc: '遍历，取交集',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
