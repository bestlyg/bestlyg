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
    name: '1760. 袋子里最少数目的球',
    url: 'https://leetcode.cn/problems/minimum-limit-of-balls-in-a-bag',
    level: 'Easy',
    tagList: [],
    desc: `你的开销是单个袋子里球数目的 最大值 ，你想要 最小化 开销。请你返回进行上述操作后的最小开销。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 1335,
            memory: 29.26,
            desc: '二分答案',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
