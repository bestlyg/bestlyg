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
    name: '2411. 按位或最大的最小子数组长度',
    url: 'https://leetcode.cn/problems/smallest-subarrays-with-maximum-bitwise-or',
    level: 'Easy',
    tagList: [],
    desc: `请你返回一个大小为 n 的整数数组 answer，其中 answer[i]是开始位置为 i ，按位或运算结果最大，且 最短 子数组的长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 1301,
            memory: 28.58,
            desc: '从后往前枚举每一个数字，判断如果删除后会更改最大值那就不终止',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
