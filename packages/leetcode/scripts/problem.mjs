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
    name: '909. 蛇梯棋',
    url: 'https://leetcode.cn/problems/snakes-and-ladders',
    level: 'Easy',
    tagList: [],
    desc: `返回达到编号为 n2 的方格所需的最少掷骰次数，如果不可能，则返回 -1。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 47,
            memory: 17.64,
            desc: 'bfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
