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
    name: '1432. 改变一个整数能得到的最大差值',
    url: 'https://leetcode.cn/problems/max-difference-you-can-get-from-changing-an-integer',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 a 和 b 的 最大差值 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory: 17.47,
            desc: '贪心找第一个非9的数字',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
