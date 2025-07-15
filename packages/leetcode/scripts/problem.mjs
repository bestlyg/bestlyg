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
    name: '1290. 二进制链表转整数',
    url: 'https://leetcode.cn/problems/convert-binary-number-in-a-linked-list-to-integer',
    level: 'Easy',
    tagList: [],
    desc: `请你返回该链表所表示数字的 十进制值 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 4,
            memory: 17.38,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
