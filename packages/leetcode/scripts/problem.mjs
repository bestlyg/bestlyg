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
    name: '219. 存在重复元素 II',
    url: 'https://leetcode.cn/problems/contains-duplicate-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 19,
            memory: 30.23,
            desc: '遍历，用哈希表记录前一个相同值的下标',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
