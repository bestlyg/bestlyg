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
    name: '1745. 分割回文串 IV',
    url: 'https://leetcode.cn/problems/palindrome-partitioning-iv',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 s ，如果可以将它分割成三个 非空 回文子字符串，那么返回 true ，否则返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 4928,
            memory: 324.87,
            desc: 'dfs判断每一个位置是否需要切割',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
