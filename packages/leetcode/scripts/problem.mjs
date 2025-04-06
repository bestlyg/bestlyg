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
    name: '368. 最大整除子集',
    url: 'https://leetcode.cn/problems/largest-divisible-subset',
    level: 'Easy',
    tagList: [],
    desc: `给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 179,
            memory: 17.59,
            desc: 'dp记录每个点的最大长度，并同时记录 最大长度时的前一个数字下标',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
