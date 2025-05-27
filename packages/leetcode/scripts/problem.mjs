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
    name: '2894. 分类求和并作差',
    url: 'https://leetcode.cn/problems/divisible-and-non-divisible-sums-difference',
    level: 'Easy',
    tagList: [],
    desc: `返回整数 num1 - num2 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 8,
            memory: 17.38,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
