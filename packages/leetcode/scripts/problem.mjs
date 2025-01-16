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
    name: '3095. 或值至少 K 的最短子数组 I',
    url: 'https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-i',
    level: 'Easy',
    tagList: [],
    desc: `给你一个 非负 整数数组 nums 和一个整数 k 。如果一个数组中所有元素的按位或运算 OR 的值 至少 为 k ，那么我们称这个数组是 特别的 。请你返回 nums 中 最短特别非空 子数组的长度，如果特别子数组不存在，那么返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 43,
            memory:17.7,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
