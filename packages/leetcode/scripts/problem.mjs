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
    name: '1561. 你可以获得的最大硬币数目',
    url: 'https://leetcode.cn/problems/maximum-number-of-coins-you-can-get',
    level: 'Easy',
    tagList: [],
    desc: `返回你可以获得的最大硬币数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 83,
            memory: 27.00,
            desc: '排序后贪心，每次拿最大的两个和最小的一个',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
