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
    name: '1353. 最多可以参加的会议数目',
    url: 'https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended',
    level: 'Easy',
    tagList: [],
    desc: `请你返回你可以参加的 最大 会议数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 177,
            memory: 40.79,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
