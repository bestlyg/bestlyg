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
    name: '2434. 使用机器人打印字典序最小的字符串',
    url: 'https://leetcode.cn/problems/using-a-robot-to-print-the-lexicographically-smallest-string',
    level: 'Easy',
    tagList: [],
    desc: `请你返回纸上能写出的字典序最小的字符串。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 523,
            memory: 20.06,
            desc: '入栈字符后，判断当前最小字符是否大于等于栈顶字符',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
