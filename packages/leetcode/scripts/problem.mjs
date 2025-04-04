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
    name: '1123. 最深叶节点的最近公共祖先',
    url: 'https://leetcode.cn/problems/lowest-common-ancestor-of-deepest-leaves',
    level: 'Easy',
    tagList: [],
    desc: `给你一个有根节点 root 的二叉树，返回它 最深的叶节点的最近公共祖先 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 8,
            memory: 18.02,
            desc: '记录所有最底层的节点，向上遍历直到节点相同',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
