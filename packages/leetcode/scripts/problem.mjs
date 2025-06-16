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
    name: '2016. 增量元素之间的最大差值',
    url: 'https://leetcode.cn/problems/maximum-difference-between-increasing-elements',
    level: 'Easy',
    tagList: [],
    desc: `返回 最大差值 。如果不存在满足要求的 i 和 j ，返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory: 17.58,
            desc: '遍历时记录之前的最小值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
