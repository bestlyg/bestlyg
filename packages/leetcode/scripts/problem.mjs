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
    name: '40. 组合总和 II',
    url: 'https://leetcode.cn/problems/combination-sum-ii',
    level: 'Easy',
    tagList: [],
    desc: `给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的每个数字在每个组合中只能使用 一次 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 12,
            memory: 17.80,
            desc: 'dfs，回溯',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
