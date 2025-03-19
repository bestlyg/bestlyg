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
    exist: true,
    name: '2610. 转换二维数组',
    url: 'https://leetcode.cn/problems/convert-an-array-into-a-2d-array-with-conditions',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums 。请你创建一个满足以下条件的二维数组：二维数组应该 只 包含数组 nums 中的元素。二维数组中的每一行都包含 不同 的整数。二维数组的行数应尽可能 少 。返回结果数组。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3,
            memory: 17.52,
            desc: '计数后遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
