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
    name: '1865. 找出和为指定值的下标对',
    url: 'https://leetcode.cn/problems/finding-pairs-with-a-certain-sum',
    level: 'Easy',
    tagList: [],
    desc: `实现 FindSumPairs 类。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 476,
            memory: 47.23,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
