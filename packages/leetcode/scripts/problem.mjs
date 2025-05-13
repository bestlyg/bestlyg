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
    name: '3335. 字符串转换后的长度 I',
    url: 'https://leetcode.cn/problems/total-characters-in-string-after-transformations-i',
    level: 'Easy',
    tagList: [],
    desc: `返回 恰好 执行 t 次转换后得到的字符串的 长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.10',
            time: 410,
            memory: 18.05,
            desc: '记录每一个字母的数量，对z做特殊处理，用偏移值表示移动',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
