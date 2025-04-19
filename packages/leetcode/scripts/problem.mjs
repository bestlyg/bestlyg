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
    exist: true,
    name: '2563. 统计公平数对的数目',
    url: 'https://leetcode.cn/problems/count-the-number-of-fair-pairs',
    level: 'Easy',
    tagList: [],
    desc: `给你一个下标从 0 开始、长度为 n 的整数数组 nums ，和两个整数 lower 和 upper ，返回 公平数对的数目 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 243,
            memory: 31.02,
            desc: '排序后用二分记录符合当前节点的另一个值的范围',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
