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
    name: '3373. 连接两棵树后最大目标节点数目 II',
    url: 'https://leetcode.cn/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii',
    level: 'Easy',
    tagList: [],
    desc: `请你返回一个长度为 n 的整数数组 answer ，answer[i] 表示将第一棵树中的一个节点与第二棵树中的一个节点连接一条边后，第一棵树中节点 i 的 目标节点 数目的 最大值 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 693,
            memory: 100.39,
            desc: '先求出所有节点相同奇偶的数量，再对第二颗树进行奇偶互换求出最大值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
