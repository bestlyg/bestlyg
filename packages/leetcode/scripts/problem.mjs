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
    name: '3356. 零数组变换 III',
    url: 'https://leetcode.cn/problems/zero-array-transformation-iii',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 最多 可以从 queries 中删除多少个元素，使得 queries 中剩下的元素仍然能将 nums 变为一个 零数组 。如果无法将 nums 变为一个 零数组 ，返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.10',
            time: 456,
            memory: 57.63,
            desc: '对queries排序，遍历每一个nums下标，用堆记录所有起始点小于等于该下标的query，并按照尾端点排序',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
