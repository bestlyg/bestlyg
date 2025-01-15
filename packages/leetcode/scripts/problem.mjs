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
    name: '3066. 超过阈值的最少操作数 II',
    url: 'https://leetcode.cn/problems/minimum-operations-to-exceed-threshold-value-ii',
    level: 'Easy',
    tagList: [],
    desc: `你需要使数组中的所有元素都大于或等于 k ，请你返回需要的 最少 操作次数。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 295,
            memory:34.67,
            desc: '堆排序',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
