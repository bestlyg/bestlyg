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
    name: '2360. 图中的最长环',
    url: 'https://leetcode.cn/problems/longest-cycle-in-a-graph',
    level: 'Easy',
    tagList: [],
    desc: `请你返回图中的 最长 环，如果没有任何环，请返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 835,
            memory: 73.39,
            desc: '剪枝所有的没有入边的节点，直到没有节点或者所有节点都存在入边',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
