/**
 * @typedef {import("@bestlyg/common/prisma-client").Prisma.LeetcodeProblemGetPayload<{include: { solutions: true };}>} Problem
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/common';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '2711. 对角线上不同值的数量差',
    url: 'https://leetcode.cn/problems/difference-of-number-of-distinct-values-on-diagonals',
    level: 'Easy',
    tagList: [],
    desc: `返回矩阵 answer 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 131,
            memory: 17.81,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
