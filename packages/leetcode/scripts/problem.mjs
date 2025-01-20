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
    name: '2239. 找到最接近 0 的数字',
    url: 'https://leetcode.cn/problems/find-closest-number-to-zero',
    level: 'Easy',
    tagList: [],
    desc: `给你一个长度为 n 的整数数组 nums ，请你返回 nums 中最 接近 0 的数字。如果有多个答案，请你返回它们中的 最大值 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory: 17.68,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
