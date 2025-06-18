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
    name: '2966. 划分数组并满足最大差限制',
    url: 'https://leetcode.cn/problems/divide-array-into-arrays-with-max-difference',
    level: 'Easy',
    tagList: [],
    desc: `返回一个 二维数组 ，包含所有的子数组。如果不可能满足条件，就返回一个空数组。如果有多个答案，返回 任意一个 即可。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 87,
            memory: 32.63,
            desc: '贪心，排序后依次比较',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
