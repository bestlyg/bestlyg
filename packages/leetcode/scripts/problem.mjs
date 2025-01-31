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
    name: '541. 反转字符串 II',
    url: 'https://leetcode.cn/problems/reverse-string-ii',
    level: 'Easy',
    tagList: [],
    desc: `给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory: 17.62,
            desc: '遍历后反转',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
