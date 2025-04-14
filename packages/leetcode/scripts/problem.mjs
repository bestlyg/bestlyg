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
    name: '1534. 统计好三元组',
    url: 'https://leetcode.cn/problems/count-good-triplets',
    level: 'Easy',
    tagList: [],
    desc: `返回 好三元组的数量 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 343,
            memory: 17.46,
            desc: '枚举',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
