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
    name: '2845. 统计趣味子数组的数目',
    url: 'https://leetcode.cn/problems/count-of-interesting-subarrays',
    level: 'Easy',
    tagList: [],
    desc: `请你找出并统计数组中 趣味子数组 的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 247,
            memory: 40.54,
            desc: '前缀和遍历区间内所有的符合规则的值，遍历前缀和数组利用模上modulo来找出相同倍数的值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
