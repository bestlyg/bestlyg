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
    name: '131. 分割回文串',
    url: 'https://leetcode.cn/problems/palindrome-partitioning',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 28,
            memory: 39.18,
            desc: 'dfs判断每一个子串',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
