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
    name: '2643. 一最多的行',
    url: 'https://leetcode.cn/problems/row-with-maximum-ones',
    level: 'Easy',
    tagList: [],
    desc: `给你一个大小为 m x n 的二进制矩阵 mat ，请你找出包含最多 1 的行的下标（从 0 开始）以及这一行中 1 的数目。如果有多行包含最多的 1 ，只需要选择 行下标最小 的那一行。返回一个由行下标和该行中 1 的数量组成的数组。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 19,
            memory: 18.13,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
