/**
 * @typedef {import("@bestlyg/data/prisma-client").Prisma.LeetcodeProblemGetPayload<{include: { solutions: true };}>} Problem
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '1742. 盒子中小球的最大数量',
    url: 'https://leetcode.cn/problems/maximum-number-of-balls-in-a-box',
    level: 'Easy',
    tagList: [],
    desc: `给你两个整数 lowLimit 和 highLimit ，返回放有最多小球的盒子中的小球数量。如果有多个盒子都满足放有最多小球，只需返回其中任一盒子的小球数量。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 567,
            memory: 17.59,
            desc: '遍历时存储',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
