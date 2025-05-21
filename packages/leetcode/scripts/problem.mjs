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
    name: '3356. 零数组变换 II',
    url: 'https://leetcode.cn/problems/zero-array-transformation-ii',
    level: 'Easy',
    tagList: [],
    desc: `返回 k 可以取到的 最小非负 值，使得在 顺序 处理前 k 个查询后，nums 变成 零数组。如果不存在这样的 k，则返回 -1。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.10',
            time: 975,
            memory: 63.3,
            desc: '二分query，判断最小能零数组的大小',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
