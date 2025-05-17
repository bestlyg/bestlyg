/**
 * @typedef {import("@bestlyg/common/prisma-client").Prisma.LeetcodeProblemGetPayload<{include: { solutions: true };}>} Problem
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/common';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '75. 颜色分类',
    url: 'https://leetcode.cn/problems/sort-colors',
    level: 'Easy',
    tagList: [],
    desc: `给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.10',
            time: 0,
            memory: 17.43,
            desc: '遍历，记录最后一个0和最先一个2',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
