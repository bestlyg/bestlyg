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
    name: '2874. 有序三元组中的最大值 II',
    url: 'https://leetcode.cn/problems/maximum-value-of-an-ordered-triplet-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你一个下标从 0 开始的整数数组 nums 。请你从所有满足 i < j < k 的下标三元组 (i, j, k) 中，找出并返回下标三元组的最大值。如果所有满足条件的三元组的值都是负数，则返回 0 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 1527,
            memory: 49.89,
            desc: '遍历j值，记录左侧最大值和最小值，以及右侧最大值和最小值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
