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
    name: '2944. 购买水果需要的最少金币数',
    url: 'https://leetcode.cn/problems/minimum-number-of-coins-for-fruits',
    level: 'Easy',
    tagList: [],
    desc: `请你返回获得所有水果所需要的 最少 金币数。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 2577,
            memory: 416.74,
            desc: '记忆化搜索',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
