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
    name: '2275. 按位与结果大于零的最长组合',
    url: 'https://leetcode.cn/problems/largest-combination-with-bitwise-and-greater-than-zero',
    level: 'Easy',
    tagList: [],
    desc: `返回按位与结果大于 0 的 最长 组合的长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 603,
            memory: 27.18,
            desc: '遍历每一位，判断当前位存在1的数字数量，最大值即答案',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
