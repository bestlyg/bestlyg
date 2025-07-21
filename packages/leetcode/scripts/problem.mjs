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
    name: '1957. 删除字符使字符串变好',
    url: 'https://leetcode.cn/problems/delete-characters-to-make-fancy-string',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 s ，请你从 s 删除 最少 的字符，使它变成一个 好字符串 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 379,
            memory: 19.17,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
