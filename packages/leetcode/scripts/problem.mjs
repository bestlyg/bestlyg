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
    name: '594. 最长和谐子序列',
    url: 'https://leetcode.cn/problems/longest-harmonious-subsequence',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums ，请你在所有可能的 子序列 中找到最长的和谐子序列的长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 59,
            memory: 18.80,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
