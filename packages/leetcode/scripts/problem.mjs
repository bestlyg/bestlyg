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
    name: '2680. 最大或值',
    url: 'https://leetcode.cn/problems/maximum-or',
    level: 'Easy',
    tagList: [],
    desc: `给你一个下标从 0 开始长度为 n 的整数数组 nums 和一个整数 k 。每一次操作中，你可以选择一个数并将它乘 2 。你最多可以进行 k 次操作，请你返回 nums[0] | nums[1] | ... | nums[n - 1] 的最大值。a | b 表示两个整数 a 和 b 的 按位或 运算。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 136,
            memory: 30.93,
            desc: '贪心对每个值进行乘K次2，判断最大值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
