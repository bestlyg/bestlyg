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
    name: '1399. 统计最大组的数目',
    url: 'https://leetcode.cn/problems/count-largest-group',
    level: 'Easy',
    tagList: [],
    desc: `请你统计每个组中的数字数目，并返回数字数目并列最多的组有多少个。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 83,
            memory:17.61,
            desc: '遍历每个数，对数值计数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
