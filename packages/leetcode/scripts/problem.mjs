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
    name: '119. 杨辉三角 II',
    url: 'https://leetcode.cn/problems/pascals-triangle-ii',
    level: 'Easy',
    tagList: [],
    desc: `给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 4,
            memory: 17.33,
            desc: 'dp',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
