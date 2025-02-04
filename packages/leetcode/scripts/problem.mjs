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
    name: '922. 按奇偶排序数组 II',
    url: 'https://leetcode.cn/problems/sort-array-by-parity-ii',
    level: 'Easy',
    tagList: [],
    desc: `给定一个非负整数数组 nums，  nums 中一半整数是 奇数 ，一半整数是 偶数 。对数组进行排序，以便当 nums[i] 为奇数时，i 也是 奇数 ；当 nums[i] 为偶数时， i 也是 偶数 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 12,
            memory: 18.84,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
