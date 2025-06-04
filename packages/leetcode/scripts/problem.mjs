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
    name: '3403. 从盒子中找出字典序最大的字符串 I',
    url: 'https://leetcode.cn/problems/find-the-lexicographically-largest-string-from-the-box-i',
    level: 'Easy',
    tagList: [],
    desc: `在所有回合结束后，找出盒子中 字典序最大的 字符串。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 23,
            memory: 17.53,
            desc: '枚举',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
