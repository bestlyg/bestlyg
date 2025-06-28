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
    name: '2099. 找到和最大的长度为 K 的子序列',
    url: 'https://leetcode.cn/problems/find-subsequence-of-length-k-with-the-largest-sum',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 任意 一个长度为 k 的整数子序列。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 2,
            memory: 17.69,
            desc: '贪心的拿数字最大的K个值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
