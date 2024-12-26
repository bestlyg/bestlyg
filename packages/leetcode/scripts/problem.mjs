import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
import { prismaClient } from '@bestlyg/data';

/** @type {prismaClient.LeetcodeSolution[]} */
const solutions = [
    {
        script: 'python',
        // date: '2024-11-01',
        time: 0,
        memory: 17.58,
        desc: '遍历',
        code: await fs.readFile(PATH_CODE, 'utf8'),
    },
];

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {prismaClient.LeetcodeProblem} */
export const problem = {
    exist: !true,
    name: '3083. 字符串及其反转中是否存在同一子字符串',
    url: 'https://leetcode.cn/problems/existence-of-a-substring-in-a-string-and-its-reverse',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 s ，请你判断字符串 s 是否存在一个长度为 2 的子字符串，在其反转后的字符串中也出现。如果存在这样的子字符串，返回 true；如果不存在，返回 false 。`,
    solutions,
};
