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
    name: '45. 跳跃游戏 II',
    url: 'https://leetcode.cn/problems/jump-game-ii',
    level: 'Easy',
    tagList: [],
    desc: `返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3321,
            memory: 18.45,
            desc: 'dp',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
