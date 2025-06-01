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
    name: '2929. 给小朋友们分糖果 II',
    url: 'https://leetcode.cn/problems/distribute-candies-among-children-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你两个正整数 n 和 limit 。请你将 n 颗糖果分给 3 位小朋友，确保没有任何小朋友得到超过 limit 颗糖果，请你返回满足此条件下的 总方案数 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 5297,
            memory: 17.41,
            desc: '只有三个人，遍历第一个人获取到的数量，求出第二个人最多和最少的数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
