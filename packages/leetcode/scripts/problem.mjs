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
    name: '2294. 划分数组使最大差为 K',
    url: 'https://leetcode.cn/problems/partition-array-such-that-maximum-difference-is-k',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums 和一个整数 k 。你可以将 nums 划分成一个或多个 子序列 ，使 nums 中的每个元素都 恰好 出现在一个子序列中。在满足每个子序列中最大值和最小值之间的差值最多为 k 的前提下，返回需要划分的 最少 子序列数目。子序列 本质是一个序列，可以通过删除另一个序列中的某些元素（或者不删除）但不改变剩下元素的顺序得到。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 120,
            memory: 28.63,
            desc: '贪心，排序后依次比较',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
