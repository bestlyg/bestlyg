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
    name: '2566. 替换一个数字后的最大差值',
    url: 'hhttps://leetcode.cn/problems/maximum-difference-by-remapping-a-digit',
    level: 'Easy',
    tagList: [],
    desc: `请你返回将 num 中 恰好一个 数字进行替换后，得到的最大值和最小值的差为多少。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory: 17.65,
            desc: '贪心找第一个非9的数字',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
