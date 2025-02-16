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
    exist: !true,
    name: '1299. 将每个元素替换为右侧最大元素',
    url: 'https://leetcode.cn/problems/replace-elements-with-greatest-element-on-right-side',
    level: 'Easy',
    tagList: [],
    desc: `给你一个数组 arr ，请你将每个元素用它右边最大的元素替换，如果是最后一个元素，用 -1 替换。完成所有替换操作后，请你返回这个数组。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 50,
            memory: 18.63,
            desc: '从后往前遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
