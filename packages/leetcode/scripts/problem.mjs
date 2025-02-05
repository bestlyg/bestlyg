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
    name: '90. 子集 II',
    url: 'https://leetcode.cn/problems/subsets-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 子集（幂集）。解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory:17.98,
            desc: 'dfs所有的可能并去重',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
