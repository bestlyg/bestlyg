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
    name: '2999. 统计强大整数的数目',
    url: 'https://leetcode.cn/problems/count-the-number-of-powerful-integers',
    level: 'Easy',
    tagList: [],
    desc: `请你返回区间 [start..finish] 内强大整数的 总数目 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 35,
            memory: 17.90,
            desc: '数位dp',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
