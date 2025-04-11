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
    name: '3375. 使数组的值全部为 K 的最少操作次数',
    url: 'https://leetcode.cn/problems/count-symmetric-integers',
    level: 'Easy',
    tagList: [],
    desc: `返回在 [low, high] 范围内的 对称整数的数目 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 869,
            memory: 17.57,
            desc: '遍历每一个数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
