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
    name: '3046. 分割数组',
    url: 'https://leetcode.cn/problems/split-the-array',
    level: 'Easy',
    tagList: [],
    desc: `如果能够分割数组就返回 true ，否则返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2024-11-01',
            time: 4,
            memory: 17.7,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
