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
    name: '2270. 分割数组的方案数',
    url: 'https://leetcode.cn/problems/number-of-ways-to-split-array',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 nums 中的 合法分割 方案数。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 57,
            memory: 31.80,
            desc: '前缀和遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
