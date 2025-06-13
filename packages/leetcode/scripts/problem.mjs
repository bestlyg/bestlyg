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
    name: '2616. 最小化数对的最大差值',
    url: 'https://leetcode.cn/problems/minimize-the-maximum-difference-of-pairs',
    level: 'Easy',
    tagList: [],
    desc: `请你返回 p 个下标对对应数值 最大差值 的 最小值 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 311,
            memory: 31.96,
            desc: '二分答案',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
