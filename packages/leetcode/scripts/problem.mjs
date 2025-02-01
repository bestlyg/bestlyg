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
    name: '81. 搜索旋转排序数组 II',
    url: 'https://leetcode.cn/problems/search-in-rotated-sorted-array-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。如果 nums 中存在这个目标值 target ，则返回 true ，否则返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 0,
            memory: 17.75,
            desc: 'in计算',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
