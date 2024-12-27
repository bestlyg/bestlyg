/**
 * @typedef {import("@bestlyg/data").prismaClient.LeetcodeScriptType}
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
import { prismaClient } from '@bestlyg/data';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
export const problem = {
    exist: !true,
    name: '3159. 查询数组中元素的出现位置',
    url: 'https://leetcode.cn/problems/find-occurrences-of-an-element-in-an-array',
    level: 'Easy',
    tagList: [],
    desc: `请你返回一个整数数组 answer ，包含所有查询的答案。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 49,
            memory: 31.65,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
