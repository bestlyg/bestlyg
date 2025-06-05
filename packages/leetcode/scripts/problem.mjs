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
    name: '1061. 按字典序排列最小的等效字符串',
    url: 'https://leetcode.cn/problems/lexicographically-smallest-equivalent-string',
    level: 'Easy',
    tagList: [],
    desc: `在所有回合结束后，找出盒子中 字典序最大的 字符串。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 3,
            memory: 17.78,
            desc: '并查集',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
