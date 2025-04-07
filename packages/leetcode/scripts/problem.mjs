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
    name: '416. 分割等和子集',
    url: 'https://leetcode.cn/problems/partition-equal-subset-sum',
    level: 'Easy',
    tagList: [],
    desc: `给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 1736,
            memory: 485.61,
            desc: '遍历所有的数组，判断是否能凑成nsum/2的数值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
