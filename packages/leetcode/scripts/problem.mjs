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
    name: '350. 两个数组的交集 II',
    url: 'https://leetcode.cn/problems/intersection-of-two-arrays-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 3,
            memory: 17.93,
            desc: '计数后遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
