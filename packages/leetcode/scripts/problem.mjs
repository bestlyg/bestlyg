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
    name: '2302. 统计得分小于 K 的子数组数目',
    url: 'https://leetcode.cn/problems/count-subarrays-with-score-less-than-k',
    level: 'Easy',
    tagList: [],
    desc: `给你一个正整数数组 nums 和一个整数 k ，请你返回 nums 中分数 严格小于 k 的 非空整数子数组数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 160,
            memory: 29.73,
            desc: '滑动窗口，遍历右端点，记录最大符合条件的左侧端点',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
