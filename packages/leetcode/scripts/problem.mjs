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
    name: '3280. 将日期转换为二进制表示',
    url: 'https://leetcode.cn/problems/convert-date-to-binary',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 date，它的格式为 yyyy-mm-dd，表示一个公历日期。返回 date 的 二进制 表示。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory: 17.43,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
