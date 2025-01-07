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
    name: '3019. 按键变更的次数',
    url: 'https://leetcode.cn/problems/number-of-changing-keys',
    level: 'Easy',
    tagList: [],
    desc: `返回用户输入过程中按键变更的次数。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3,
            memory: 17.33,
            desc: '两两结对遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
