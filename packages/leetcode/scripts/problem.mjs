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
    name: '1328. 破坏回文串',
    url: 'https://leetcode.cn/problems/break-a-palindrome',
    level: 'Easy',
    tagList: [],
    desc: `给你一个由小写英文字母组成的回文字符串 palindrome ，请你将其中 一个 字符用任意小写英文字母替换，使得结果字符串的 字典序最小 ，且 不是 回文串。请你返回结果字符串。如果无法做到，则返回一个 空串 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory: 17.57,
            desc: '贪心是不是都是a，不是a就找第一个非a换成a，否则最后一个字符换成b',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
