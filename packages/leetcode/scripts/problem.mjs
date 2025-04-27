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
    name: '3392. 统计符合条件长度为 3 的子数组数目',
    url: 'https://leetcode.cn/problems/count-subarrays-of-length-three-with-a-condition',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums ，请你返回长度为 3 的 子数组 的数量，满足第一个数和第三个数的和恰好为第二个数的一半。子数组 指的是一个数组中连续 非空 的元素序列。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 11,
            memory: 17.39,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
