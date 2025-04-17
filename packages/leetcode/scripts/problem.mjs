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
    name: '2176. 统计数组中相等且可以被整除的数对',
    url: 'https://leetcode.cn/problems/count-equal-and-divisible-pairs-in-an-array',
    level: 'Easy',
    tagList: [],
    desc: `给你一个下标从 0 开始长度为 n 的整数数组 nums 和一个整数 k ，请你返回满足 0 <= i < j < n ，nums[i] == nums[j] 且 (i * j) 能被 k 整除的数对 (i, j) 的 数目 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 39,
            memory: 17.49,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
