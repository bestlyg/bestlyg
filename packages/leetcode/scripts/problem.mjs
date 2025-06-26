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
    name: '2311. 小于等于 K 的最长二进制子序列',
    url: 'https://leetcode.cn/problems/longest-binary-subsequence-less-than-or-equal-to-k',
    level: 'Easy',
    tagList: [],
    desc: `给你一个二进制字符串 s 和一个正整数 k 。请你返回 s 的 最长 子序列的长度，且该子序列对应的 二进制 数字小于等于 k 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 34,
            memory: 17.83,
            desc: '贪心的记录最小前缀',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
