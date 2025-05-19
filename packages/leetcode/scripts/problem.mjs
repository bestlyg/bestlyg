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
    name: '3024. 三角形类型',
    url: 'https://leetcode.cn/problems/type-of-triangle',
    level: 'Easy',
    tagList: [],
    desc: `给你一个下标从 0 开始长度为 3 的整数数组 nums ，需要用它们来构造三角形。如果一个三角形的所有边长度相等，那么这个三角形称为 equilateral 。如果一个三角形恰好有两条边长度相等，那么这个三角形称为 isosceles 。如果一个三角形三条边的长度互不相同，那么这个三角形称为 scalene 。如果这个数组无法构成一个三角形，请你返回字符串 "none" ，否则返回一个字符串表示这个三角形的类型。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.10',
            time: 0,
            memory: 17.34,
            desc: '直接判断',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
