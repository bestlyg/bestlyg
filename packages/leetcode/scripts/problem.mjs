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
    name: '3341. 到达最后一个房间的最少时间 I',
    url: 'https://leetcode.cn/problems/find-minimum-time-to-reach-last-room-i',
    level: 'Easy',
    tagList: [],
    desc: `请你返回到达房间 (n - 1, m - 1) 所需要的 最少 时间。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 191,
            memory: 18.18,
            desc: '优先队列',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
