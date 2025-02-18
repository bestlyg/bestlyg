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
    name: '2080. 区间内查询数字的频率',
    url: 'https://leetcode.cn/problems/range-frequency-queries',
    level: 'Easy',
    tagList: [],
    desc: `请你设计一个数据结构，它能求出给定子数组内一个给定值的 频率 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 123,
            memory: 57.92,
            desc: '把相同的数字归拢后查询',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
