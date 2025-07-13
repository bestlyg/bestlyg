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
    name: '2410. 运动员和训练师的最大匹配数',
    url: 'https://leetcode.cn/problems/maximum-matching-of-players-with-trainers',
    level: 'Easy',
    tagList: [],
    desc: `请你返回满足上述要求 players 和 trainers 的 最大 匹配数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 92,
            memory: 31.13,
            desc: '贪心排序',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
