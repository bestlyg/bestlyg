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
    name: '135. 分发糖果',
    url: 'https://leetcode.cn/problems/candy',
    level: 'Easy',
    tagList: [],
    desc: `请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 23,
            memory: 19.8,
            desc: '贪心从左到右和从右到左',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
