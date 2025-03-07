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
    name: '2597. 美丽子集的数目',
    url: 'https://leetcode.cn/problems/the-number-of-beautiful-subsets',
    level: 'Easy',
    tagList: [],
    desc: `请你返回数组 nums 中 美丽子数组 的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 2275,
            memory: 17.66,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
