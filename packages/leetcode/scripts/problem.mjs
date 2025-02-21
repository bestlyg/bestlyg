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
    name: '2209. 用地毯覆盖后的最少白色砖块',
    url: 'https://leetcode.cn/problems/minimum-white-tiles-after-covering-with-carpets',
    level: 'Easy',
    tagList: [],
    desc: `请你返回没被覆盖的白色砖块的 最少 数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 8464,
            memory:  457.08,
            desc: '记忆话dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
