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
    name: '1394. 找出数组中的幸运数',
    url: 'https://leetcode.cn/problems/find-lucky-integer-in-an-array',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 arr，请你从中找出并返回一个幸运数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time:0,
            memory: 17.82,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
