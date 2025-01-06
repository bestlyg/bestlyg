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
    name: '2274. 不含特殊楼层的最大连续楼层数',
    url: 'https://leetcode.cn/problems/maximum-consecutive-floors-without-special-floors',
    level: 'Easy',
    tagList: [],
    desc: `返回不含特殊楼层的 最大 连续楼层数。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 107,
            memory: 31.85,
            desc: '两两结对遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
