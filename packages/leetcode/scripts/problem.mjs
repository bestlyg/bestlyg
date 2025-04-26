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
    name: '2444. 统计定界子数组的数目',
    url: 'https://leetcode.cn/problems/count-subarrays-with-fixed-bounds',
    level: 'Easy',
    tagList: [],
    desc: `返回定界子数组的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 131,
            memory: 28.49,
            desc: '先找出所有合法区间，即不包含小于min和大于max的值的区间，再遍历每一个合法区间，对于每一个端点当作结尾时的数组长度',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
