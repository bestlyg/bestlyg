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
    name: '3442. 奇偶频次间的最大差值 I',
    url: 'https://leetcode.cn/problems/maximum-difference-between-even-and-odd-frequency-i',
    level: 'Easy',
    tagList: [],
    desc: `返回 最大 差值。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory:17.4,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
