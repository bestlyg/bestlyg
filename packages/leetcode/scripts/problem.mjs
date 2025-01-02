/**
 * @typedef {import("@bestlyg/data").prismaClient.LeetcodeProblem} Problem
 * @typedef {import("@bestlyg/data").prismaClient.LeetcodeSolution} Solution
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem & {solutions:Solution[]}} */
export const problem = {
    exist: true,
    name: '729. 我的日程安排表 I',
    url: 'https://leetcode.cn/problems/my-calendar-i',
    level: 'Easy',
    tagList: [],
    desc: `实现 MyCalendar 类。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 73,
            memory: 18.5,
            desc: '有序遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
