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
    name: '3340. 检查平衡字符串',
    url: 'https://leetcode.cn/problems/check-balanced-string',
    level: 'Easy',
    tagList: [],
    desc: `如果 num 是一个 平衡字符串，则返回 true；否则，返回 false。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3,
            memory: 17.69,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
