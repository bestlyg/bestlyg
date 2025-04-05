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
    name: '1863. 找出所有子集的异或总和再求和',
    url: 'https://leetcode.cn/problems/sum-of-all-subset-xor-totals',
    level: 'Easy',
    tagList: [],
    desc: `给你一个数组 nums ，请你求出 nums 中每个 子集 的 异或总和 ，计算并返回这些值相加之 和 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 23,
            memory: 17.7,
            desc: '遍历所有子数组',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
