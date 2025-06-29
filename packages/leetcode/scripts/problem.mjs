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
    name: '1498. 满足条件的子序列数目',
    url: 'https://leetcode.cn/problems/number-of-subsequences-that-satisfy-the-given-sum-condition',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums 和一个整数 target 。请你统计并返回 nums 中能满足其最小元素与最大元素的 和 小于或等于 target 的 非空 子序列的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 279,
            memory: 27.24,
            desc: '对全排列减去不符合规范的数组',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
