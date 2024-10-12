import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3158. 求出出现两次数字的 XOR 值',
    url: 'https://leetcode.cn/problems/find-the-xor-of-numbers-which-appear-twice',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个数组 nums ，数组中的数字 要么 出现一次，要么 出现两次。请你返回数组中所有出现两次数字的按位 XOR 值，如果没有数字出现过两次，返回 0 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 38,
            memory: 16.48,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
