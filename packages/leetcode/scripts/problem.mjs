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
    name: '3202. 找出有效子序列的最大长度 II',
    url: 'https://leetcode.cn/problems/find-the-maximum-length-of-valid-subsequence-ii',
    level: 'Easy',
    tagList: [],
    desc: `返回 nums 的 最长有效子序列 的长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 2525,
            memory: 26.13,
            desc: '取模，遍历每一种余数，dp[cur][prev] = dp[prev][cur] + 1',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
