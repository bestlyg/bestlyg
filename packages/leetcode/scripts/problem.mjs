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
    name: '1295. 统计位数为偶数的数字',
    url: 'https://leetcode.cn/problems/find-numbers-with-even-number-of-digits',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums，请你返回其中包含 偶数 个数位的数字的个数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 0,
            memory:17.73,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
