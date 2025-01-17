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
    exist: !true,
    name: '3097. 或值至少为 K 的最短子数组 II',
    url: 'https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 nums 中 最短特别非空 子数组的长度，如果特别子数组不存在，那么返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3548,
            memory: 35.96,
            desc: '滑动窗口记录区间内各位值的数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
