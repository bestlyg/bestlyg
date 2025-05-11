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
    name: '2918. 数组的最小相等和',
    url: 'https://leetcode.cn/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros',
    level: 'Easy',
    tagList: [],
    desc: `给你两个由正整数和 0 组成的数组 nums1 和 nums2 。你必须将两个数组中的 所有 0 替换为 严格 正整数，并且满足两个数组中所有元素的和 相等 。返回 最小 相等和 ，如果无法使两数组相等，则返回 -1 。`,
    solutions: [
        {
            script: 'python',
            date: '2025.05.10',
            time: 919,
            memory: 34.01,
            desc: '贪心的尝试把所有的0当作1',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
