import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
import { prismaClient } from '@bestlyg/data';

/** @type {prismaClient.LeetcodeSolution[]} */
const solutions = [
    {
        script: 'python',
        // date: '2024-11-01',
        time: 2189,
        memory: 79.68,
        desc: '记忆化搜索',
        code: await fs.readFile(PATH_CODE, 'utf8'),
    },
];

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {prismaClient.LeetcodeProblem} */
export const problem = {
    exist: !true,
    name: '3218. 切蛋糕的最小总开销 I',
    url: 'https://leetcode.cn/problems/minimum-cost-for-cutting-cake-i',
    level: 'Easy',
    tagList: [],
    desc: `请你返回将蛋糕全部切成 1 x 1 的蛋糕块的 最小 总开销。`,
    solutions,
};
