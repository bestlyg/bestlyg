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
    name: '1366. 通过投票对团队排名',
    url: 'https://leetcode.cn/problems/rank-teams-by-votes',
    level: 'Easy',
    tagList: [],
    desc: `请你返回能表示按排名系统 排序后 的所有团队排名的字符串。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 20,
            memory: 18.21,
            desc: '遍历后dfs比较',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
