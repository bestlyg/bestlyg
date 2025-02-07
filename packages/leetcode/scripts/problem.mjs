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
    name: '59. 螺旋矩阵 II',
    url: 'https://leetcode.cn/problems/spiral-matrix-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 4,
            memory: 17.42,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
