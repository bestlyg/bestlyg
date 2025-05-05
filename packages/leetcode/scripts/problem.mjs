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
    name: '790. 多米诺和托米诺平铺',
    url: 'https://leetcode.cn/problems/domino-and-tromino-tiling',
    level: 'Easy',
    tagList: [],
    desc: `给定整数 n ，返回可以平铺 2 x n 的面板的方法的数量。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 3,
            memory: 18.1,
            desc: '动态规划，判断上空、下空、满的情况',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
