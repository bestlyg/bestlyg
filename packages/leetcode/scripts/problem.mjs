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
    name: '2145. 统计隐藏数组数目',
    url: 'https://leetcode.cn/problems/count-the-hidden-sequences',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 符合 要求的隐藏数组的数目。如果没有符合要求的隐藏数组，请返回 0 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 116,
            memory: 31.68,
            desc: '设置一个初始值尝试构建一个数组，并记录最大值和最小值，与lower和upper差值记录',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
