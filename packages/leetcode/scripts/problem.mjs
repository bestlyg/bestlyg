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
    name: '3355. 零数组变换 I',
    url: 'https://leetcode.cn/problems/zero-array-transformation-i',
    level: 'Easy',
    tagList: [],
    desc: `如果在按顺序处理所有查询后，可以将 nums 转换为 零数组 ，则返回 true，否则返回 false。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.10',
            time: 59,
            memory: 54.06,
            desc: '差分数组记录每一个下标最多可以被处理多少次',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
