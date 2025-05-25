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
    name: '2131. 连接两字母单词得到的最长回文串',
    url: 'https://leetcode.cn/problems/longest-palindrome-by-concatenating-two-letter-words',
    level: 'Easy',
    tagList: [],
    desc: `请你返回你能得到的最长回文串的 长度 。如果没办法得到任何一个回文串，请你返回 0 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 55,
            memory: 34.98,
            desc: '遍历能成对的数量，判断相同字符的是否是奇数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
