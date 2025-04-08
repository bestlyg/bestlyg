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
    name: '3396. 使数组元素互不相同所需的最少操作次数',
    url: 'https://leetcode.cn/problems/minimum-number-of-operations-to-make-elements-in-array-distinct',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums，你需要确保数组中的元素 互不相同 。为此，你可以执行以下操作任意次：从数组的开头移除 3 个元素。如果数组中元素少于 3 个，则移除所有剩余元素。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 12,
            memory: 17.53,
            desc: '按每偏移3个单位，遍历数组是否唯一',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
