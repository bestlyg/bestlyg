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
    name: '2044. 统计按位或能得到最大值的子集数目',
    url: 'https://leetcode.cn/problems/count-number-of-maximum-bitwise-or-subsets',
    level: 'Easy',
    tagList: [],
    desc: `对数组 a 执行 按位或 ，结果等于 a[0] OR a[1] OR ... OR a[a.length - 1]（下标从 0 开始）。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 1461,
            memory: 17.45,
            desc: '二进制枚举所有可能',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
