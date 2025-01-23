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
    name: '2920. 收集所有金币可获得的最大积分',
    url: 'https://leetcode.cn/problems/maximum-points-after-collecting-coins-from-all-nodes',
    level: 'Easy',
    tagList: [],
    desc: `返回收集 所有 树节点的金币之后可以获得的最大积分。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 2657,
            memory: 370.45,
            desc: '记忆化搜索',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
