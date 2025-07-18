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
    name: '2163. 删除元素后和的最小差值',
    url: 'https://leetcode.cn/problems/minimum-difference-in-sums-after-removal-of-elements',
    level: 'Easy',
    tagList: [],
    desc: `请你返回删除 n 个元素之后，剩下两部分和的 差值的最小值 是多少。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 519,
            memory: 52.51,
            desc: '遍历前2/3个的最小值，和后2/3个的最大值，进行枚举',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
