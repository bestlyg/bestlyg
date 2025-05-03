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
    exist: !true,
    name: '1007. 行相等的最少多米诺旋转',
    url: 'https://leetcode.cn/problems/minimum-domino-rotations-for-equal-row',
    level: 'Easy',
    tagList: [],
    desc: `返回能使 tops 中所有值或者 bottoms 中所有值都相同的最小旋转次数。如果无法做到，返回 -1.`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 19,
            memory: 18.21,
            desc: '只有6个可能性，依次遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
