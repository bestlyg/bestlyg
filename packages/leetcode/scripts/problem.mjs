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
    name: '1922. 统计好数字的数目',
    url: 'https://leetcode.cn/problems/count-good-numbers',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数 n ，请你返回长度为 n 且为好数字的数字字符串 总数 。由于答案可能会很大，请你将它对 109 + 7 取余后返回 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 0,
            memory: 17.72,
            desc: '快速幂',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
