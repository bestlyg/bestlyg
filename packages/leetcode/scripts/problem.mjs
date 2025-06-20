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
    name: '3443. K 次修改后的最大曼哈顿距离',
    url: 'https://leetcode.cn/problems/maximum-manhattan-distance-after-k-changes',
    level: 'Easy',
    tagList: [],
    desc: `请找出在 按顺序 执行所有移动操作过程中的 任意时刻 ，所能达到的离原点的 最大曼哈顿距离 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 5766,
            memory: 17.86,
            desc: '贪心的枚举上下和左右',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
