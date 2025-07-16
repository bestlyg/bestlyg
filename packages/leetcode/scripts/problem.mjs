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
    name: '3201. 找出有效子序列的最大长度 I',
    url: 'https://leetcode.cn/problems/find-the-maximum-length-of-valid-subsequence-i',
    level: 'Easy',
    tagList: [],
    desc: `返回 nums 的 最长的有效子序列 的长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 538,
            memory: 65.02,
            desc: '分别计算，都是奇数，都是偶数，一奇一偶',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
