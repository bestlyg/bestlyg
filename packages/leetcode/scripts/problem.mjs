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
    name: '2537. 统计好子数组的数目',
    url: 'https://leetcode.cn/problems/count-the-number-of-good-subarrays',
    level: 'Easy',
    tagList: [],
    desc: `一个子数组 arr 如果有 至少 k 对下标 (i, j) 满足 i < j 且 arr[i] == arr[j] ，那么称它是一个 好 子数组。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 203,
            memory: 33.64,
            desc: '滑动窗口记录以当前下标为结尾时的好子数组对数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
