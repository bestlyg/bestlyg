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
    name: '2200. 找出数组中的所有 K 近邻下标',
    url: 'https://leetcode.cn/problems/find-all-k-distant-indices-in-an-array',
    level: 'Easy',
    tagList: [],
    desc: `以列表形式返回按 递增顺序 排序的所有 K 近邻下标。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 179,
            memory:17.83,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
