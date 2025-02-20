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
    name: '2595. 奇偶位数',
    url: 'https://leetcode.cn/problems/number-of-even-and-odd-bits',
    level: 'Easy',
    tagList: [],
    desc: `返回整数数组 answer ，其中 answer = [even, odd] 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3,
            memory: 17.5,
            desc: '遍历每一位',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
