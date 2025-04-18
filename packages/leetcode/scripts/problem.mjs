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
    name: '2364. 统计坏数对的数目',
    url: 'https://leetcode.cn/problems/count-number-of-bad-pairs',
    level: 'Easy',
    tagList: [],
    desc: `给你一个下标从 0 开始的整数数组 nums 。如果 i < j 且 j - i != nums[j] - nums[i] ，那么我们称 (i, j) 是一个 坏数对 。请你返回 nums 中 坏数对 的总数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 151,
            memory: 37.98,
            desc: '遍历时记录nums[i] - i的值，只有相等才不是坏整数对，所以不想等的数量即当前下标为j时的坏整数对数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
