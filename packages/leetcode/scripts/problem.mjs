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
    name: '781. 森林中的兔子',
    url: 'https://leetcode.cn/problems/rabbits-in-forest',
    level: 'Easy',
    tagList: [],
    desc: `给你数组 answers ，返回森林中兔子的最少数量。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 0,
            memory: 17.7,
            desc: '记录说每个数量的兔子有多少个，贪心的获取最大值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
