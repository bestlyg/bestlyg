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
    name: '2502. 设计内存分配器',
    url: 'https://leetcode.cn/problems/design-memory-allocator',
    level: 'Easy',
    tagList: [],
    desc: `请你设计一个具备以下功能的内存分配器。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 1157,
            memory: 18.13,
            desc: '模拟',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
