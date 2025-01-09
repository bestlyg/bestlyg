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
    exist: !true,
    name: '3297. 统计重新排列后包含另一个字符串的子字符串数目 I',
    url: 'https://leetcode.cn/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 word1 中 合法 子字符串的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 303,
            memory: 17.91,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
