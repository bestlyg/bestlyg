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
    name: '386. 字典序排数',
    url: 'https://leetcode.cn/problems/lexicographical-numbers',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数 n ，按字典序返回范围 [1, n] 内所有整数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 90,
            memory: 22.22,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
