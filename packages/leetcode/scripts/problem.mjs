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
    name: '3270. 求出数字答案',
    url: 'https://leetcode.cn/problems/find-the-key-of-the-numbers',
    level: 'Easy',
    tagList: [],
    desc: `请你返回三个数字 没有 前导 0 的数字答案。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory: 17.66,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
