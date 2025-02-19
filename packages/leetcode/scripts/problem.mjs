/**
 * @typedef {import("@bestlyg/data/prisma-client").Prisma.LeetcodeProblemGetPayload<{include: { solutions: true };}>} Problem
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '624. 数组列表中的最大距离',
    url: 'https://leetcode.cn/problems/maximum-distance-in-arrays',
    level: 'Easy',
    tagList: [],
    desc: `给定 m 个数组，每个数组都已经按照升序排好序了。现在你需要从两个不同的数组中选择两个整数（每个数组选一个）并且计算它们的距离。两个整数 a 和 b 之间的距离定义为它们差的绝对值 |a-b| 。返回最大距离。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 97,
            memory: 33.13,
            desc: '记录前面的最小值和最大值，与当前的做比较',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
