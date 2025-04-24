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
    name: '2799. 统计完全子数组的数目',
    url: 'https://leetcode.cn/problems/count-complete-subarrays-in-an-array',
    level: 'Easy',
    tagList: [],
    desc: `返回数组中 完全子数组 的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 39,
            memory: 17.86,
            desc: '计算大于等于cnt的数量和大于等于cnt+1的数量做相减，得到等于cnt的数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
