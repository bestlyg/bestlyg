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
    name: '1298. 你能从盒子里获得的最大糖果数',
    url: 'https://leetcode.cn/problems/maximum-candies-you-can-get-from-boxes',
    level: 'Easy',
    tagList: [],
    desc: `给你一个 initialBoxes 数组，表示你现在得到的盒子，你可以获得里面的糖果，也可以用盒子里的钥匙打开新的盒子，还可以继续探索从这个盒子里找到的其他盒子。请你按照上述规则，返回可以获得糖果的 最大数目 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 23,
            memory: 27.72,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
