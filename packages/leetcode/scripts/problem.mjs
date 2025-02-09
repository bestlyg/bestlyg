/**
 * @typedef {import("@bestlyg/data/prisma-client").Prisma.LeetcodeProblemGetPayload<{include: { solutions: true };}>} Problem
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '80. 删除有序数组中的重复项 II',
    url: 'https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii',
    level: 'Easy',
    tagList: [],
    desc: `给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 94,
            memory: 20.31,
            desc: '双指针遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
