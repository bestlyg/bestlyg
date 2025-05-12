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
    name: '2094. 找出 3 位偶数',
    url: 'https://leetcode.cn/problems/finding-3-digit-even-numbers',
    level: 'Easy',
    tagList: [],
    desc: `将找出的所有互不相同的整数按 递增顺序 排列，并以数组形式返回。`,
    solutions: [
        {
            script: 'python',
            date: '2025.05.10',
            time: 2079,
            memory: 17.86,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
