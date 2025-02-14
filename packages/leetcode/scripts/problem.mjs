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
    name: '1552. 两球之间的磁力',
    url: 'https://leetcode.cn/problems/magnetic-force-between-two-balls',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 position 和一个整数 m ，请你返回最大化的最小磁力。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 429,
            memory: 30.03,
            desc: '二分答案',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
