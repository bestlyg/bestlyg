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
    name: '2140. 解决智力问题',
    url: 'https://leetcode.cn/problems/solving-questions-with-brainpower',
    level: 'Easy',
    tagList: [],
    desc: `请你返回这场考试里你能获得的 最高 分数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 259,
            memory: 126,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
