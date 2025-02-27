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
    name: '2296. 设计一个文本编辑器',
    url: 'https://leetcode.cn/problems/design-a-text-editor',
    level: 'Easy',
    tagList: [],
    desc: `请你实现 TextEditor 类`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 1385,
            memory: 36.03,
            desc: '模拟',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
