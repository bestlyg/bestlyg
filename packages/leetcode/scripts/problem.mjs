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
    exist: !true,
    name: '2070. 每一个查询的最大美丽值',
    url: 'https://leetcode.cn/problems/most-beautiful-item-for-each-query',
    level: 'Easy',
    tagList: [],
    desc: `请你返回一个长度与 queries 相同的数组 answer，其中 answer[j]是第 j 个查询的答案。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 135,
            memory: 53.73,
            desc: '排序query后，对于符合的值存入堆',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
