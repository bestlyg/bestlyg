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
    name: '2588. 统计美丽子数组数目',
    url: 'https://leetcode.cn/problems/count-the-number-of-beautiful-subarrays',
    level: 'Easy',
    tagList: [],
    desc: `请你返回数组 nums 中 美丽子数组 的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 215,
            memory: 38.32,
            desc: '记录前缀和，用异或判断是否符合条件，即子数组异或为0',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
