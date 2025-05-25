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
    name: '2942. 查找包含给定字符的单词',
    url: 'https://leetcode.cn/problems/find-words-containing-character',
    level: 'Easy',
    tagList: [],
    desc: `给你一个下标从 0 开始的字符串数组 words 和一个字符 x 。请你返回一个 下标数组 ，表示下标在数组中对应的单词包含字符 x 。`,
    solutions: [
        {
            script: 'python',
            date: '2025.05.24',
            time: 0,
            memory: 17.47,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
