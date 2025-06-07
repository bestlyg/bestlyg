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
    name: '3170. 删除星号以后字典序最小的字符串',
    url: 'https://leetcode.cn/problems/lexicographically-minimum-string-after-removing-stars',
    level: 'Easy',
    tagList: [],
    desc: `请你返回删除所有 '*' 字符以后，剩余字符连接而成的 字典序最小 的字符串。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 1275,
            memory: 28.52,
            desc: '遍历时用堆记录字典最小的下标最小的字符',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
