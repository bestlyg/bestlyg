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
    name: '2962. 统计最大元素出现至少 K 次的子数组',
    url: 'https://leetcode.cn/problems/count-subarrays-where-max-element-appears-at-least-k-times',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums 和一个 正整数 k 。请你统计有多少满足 「 nums 中的 最大 元素」至少出现 k 次的子数组，并返回满足这一条件的子数组的数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 82,
            memory: 29.4,
            desc: '滑动窗口，遍历右端点，记录最大符合条件的左侧端点',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
