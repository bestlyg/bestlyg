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
    name: '3085. 成为 K 特殊字符串需要删除的最少字符数',
    url: 'https://leetcode.cn/problems/minimum-deletions-to-make-string-k-special',
    level: 'Easy',
    tagList: [],
    desc: `返回使 word 成为 k 特殊字符串 需要删除的字符的最小数量。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 63,
            memory:17.76,
            desc: '计数后判断以每一个元素当作开头的最小值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
