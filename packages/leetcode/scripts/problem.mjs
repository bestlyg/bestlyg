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
    name: '3219. 切蛋糕的最小总开销 II',
    url: 'https://leetcode.cn/problems/minimum-cost-for-cutting-cake-ii',
    level: 'Easy',
    tagList: [],
    desc: `请你返回将蛋糕全部切成 1 x 1 的蛋糕块的 最小 总开销。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 1107,
            memory: 46.13,
            desc: '贪心每次切成本最大的',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
