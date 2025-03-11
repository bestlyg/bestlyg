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
    name: '2012. 数组美丽值求和',
    url: 'https://leetcode.cn/problems/sum-of-beauty-in-the-array',
    level: 'Easy',
    tagList: [],
    desc: `返回符合 1 <= i <= nums.length - 2 的所有 nums[i] 的 美丽值的总和 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 2458,
            memory: 43.46,
            desc: '有序数组存储所有的值，判断当前值的左侧最大和右侧最小',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
