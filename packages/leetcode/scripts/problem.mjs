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
    name: '2359. 找到离给定两个节点最近的节点',
    url: 'https://leetcode.cn/problems/find-closest-node-to-given-two-nodes',
    level: 'Easy',
    tagList: [],
    desc: `请你返回一个从 node1 和 node2 都能到达节点的编号，使节点 node1 和节点 node2 到这个节点的距离 较大值最小化。如果有多个答案，请返回 最小 的节点编号。如果答案不存在，返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 149,
            memory: 31.08,
            desc: 'dfs求出两个节点能到达的每个节点的距离',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
