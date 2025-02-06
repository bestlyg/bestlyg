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
    name: '47. 全排列 II',
    url: 'https://leetcode.cn/problems/permutations-ii',
    level: 'Easy',
    tagList: [],
    desc: `给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 12,
            memory: 17.82,
            desc: '内置全排列',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
