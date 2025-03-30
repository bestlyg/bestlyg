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
    name: '2109. 向字符串添加空格',
    url: 'https://leetcode.cn/problems/adding-spaces-to-a-string',
    level: 'Easy',
    tagList: [],
    desc: `请你添加空格，并返回修改后的字符串。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 135,
            memory: 45.33,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
