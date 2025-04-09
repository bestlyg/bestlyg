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
    name: '3375. 使数组的值全部为 K 的最少操作次数',
    url: 'https://leetcode.cn/problems/minimum-operations-to-make-array-values-equal-to-k',
    level: 'Easy',
    tagList: [],
    desc: `你的目标是将 nums 中的所有元素都变为 k ，请你返回 最少 操作次数。如果无法将所有元素都变 k ，那么返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 75,
            memory: 17.75,
            desc: '计数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
