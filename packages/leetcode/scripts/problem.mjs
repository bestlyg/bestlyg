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
    name: '3304. 找出第 K 个字符 I',
    url: 'https://leetcode.cn/problems/find-the-k-th-character-in-string-game-i',
    level: 'Easy',
    tagList: [],
    desc: `在执行足够多的操作后， word 中 至少 存在 k 个字符，此时返回 word 中第 k 个字符的值。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 11,
            memory: 17.50,
            desc: '模拟',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
