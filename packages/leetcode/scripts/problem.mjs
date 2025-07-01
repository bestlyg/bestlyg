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
    name: '3330. 找到初始输入字符串 I',
    url: 'https://leetcode.cn/problems/find-the-original-typed-string-i',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 word ，它表示 最终 显示在 Alice 显示屏上的结果。请你返回 Alice 一开始可能想要输入字符串的总方案数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 47,
            memory: 17.43,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
