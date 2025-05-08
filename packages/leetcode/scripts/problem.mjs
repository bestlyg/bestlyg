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
    name: '3342. 到达最后一个房间的最少时间 II',
    url: 'https://leetcode.cn/problems/find-minimum-time-to-reach-last-room-ii',
    level: 'Easy',
    tagList: [],
    desc: `请你返回到达房间 (n - 1, m - 1) 所需要的 最少 时间。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 2397,
            memory: 161.84,
            desc: '优先队列，记录下一步要走的步长',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
