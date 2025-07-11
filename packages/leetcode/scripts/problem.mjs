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
    name: '3169. 无需开会的工作日',
    url: 'https://leetcode.cn/problems/count-days-without-meetings',
    level: 'Easy',
    tagList: [],
    desc: `返回员工可工作且没有安排会议的天数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 237,
            memory: 51.89,
            desc: '合并区间',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
