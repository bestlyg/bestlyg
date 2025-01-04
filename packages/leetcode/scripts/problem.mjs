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
    exist: !true,
    name: '732. 我的日程安排表 III',
    url: 'https://leetcode.cn/problems/my-calendar-iii',
    level: 'Easy',
    tagList: [],
    desc: `实现 MyCalendar 类。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 1596,
            memory: 17.97,
            desc: '差分记录区间内已经订阅的课程数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
