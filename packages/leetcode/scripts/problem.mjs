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
    name: '3136. 有效单词',
    url: 'https://leetcode.cn/problems/valid-word',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 word 。如果 word 是一个有效单词，则返回 true ，否则返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory: 17.39,
            desc: '直接判断',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
