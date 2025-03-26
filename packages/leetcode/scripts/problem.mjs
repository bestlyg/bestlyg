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
    name: '2829. k-avoiding 数组的最小总和',
    url: 'https://leetcode.cn/problems/determine-the-minimum-sum-of-a-k-avoiding-array',
    level: 'Easy',
    tagList: [],
    desc: `返回长度为 n 的 k-avoiding 数组的可能的最小总和。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 3,
            memory: 17.35,
            desc: '遍历，记录哪个数被用过了',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
