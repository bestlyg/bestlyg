/**
 * @typedef {import("@bestlyg/data").prismaClient.LeetcodeProblem} Problem
 * @typedef {import("@bestlyg/data").prismaClient.LeetcodeSolution} Solution
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem & {solutions:Solution[]}} */
export const problem = {
    exist: true,
    name: '680. 验证回文串 II',
    url: 'https://leetcode.cn/problems/valid-palindrome-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 s，最多 可以从中删除一个字符。请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3094,
            memory: 613.83,
            desc: '递归判断每一个子串',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
