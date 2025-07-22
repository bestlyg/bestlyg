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
    name: '1695. 删除子数组的最大得分',
    url: 'https://leetcode.cn/problems/maximum-erasure-value',
    level: 'Easy',
    tagList: [],
    desc: `返回 只删除一个 子数组可获得的 最大得分 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 242,
            memory: 28.33,
            desc: '滑动窗口，遍历r，判断不符合要求时移动l',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
