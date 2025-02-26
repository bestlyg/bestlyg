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
    name: '1472. 设计浏览器历史记录',
    url: 'https://leetcode.cn/problems/design-browser-history',
    level: 'Easy',
    tagList: [],
    desc: `请你实现 BrowserHistory 类。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 25,
            memory: 19.75,
            desc: '模拟',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
