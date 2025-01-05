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
    name: '2241. 设计一个 ATM 机器',
    url: 'https://leetcode.cn/problems/design-an-atm-machine',
    level: 'Easy',
    tagList: [],
    desc: `请你实现 ATM 类`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 23,
            memory: 20.02,
            desc: '记录数量后从大到小取值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
