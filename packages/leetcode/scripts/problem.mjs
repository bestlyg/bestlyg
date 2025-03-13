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
    name: '3306. 元音辅音字符串计数 II',
    url: 'https://leetcode.cn/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii',
    level: 'Easy',
    tagList: [],
    desc: `返回 word 的 子字符串 中，每个元音字母（'a'、'e'、'i'、'o'、'u'）至少 出现一次，并且 恰好 包含 k 个辅音字母的子字符串的总数。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 2283,
            memory: 18.3,
            desc: '计算大于等于K的和大于等于K+1的值进行相减',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
