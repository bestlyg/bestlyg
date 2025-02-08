/**
 * @typedef {import("@bestlyg/data/prisma-client").Prisma.LeetcodeProblemGetPayload<{include: { solutions: true };}>} Problem
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '63. 不同路径 II',
    url: 'https://leetcode.cn/problems/unique-paths-ii',
    level: 'Easy',
    tagList: [],
    desc: `返回机器人能够到达右下角的不同路径数量。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory: 17.56,
            desc: 'dp[i][j]表示ij下标的路径数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
