import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '1323. 6 和 9 组成的最大数字',
    url: 'https://leetcode.cn/problems/maximum-69-number',
    level: 'Easy',
    tagList: [],
    desc: `给你一个仅由数字 6 和 9 组成的正整数 num。你最多只能翻转一位数字，将 6 变成 9，或者把 9 变成 6 。请返回你可以得到的最大数字。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory: 17.36,
            desc: '找最近的6变成9',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
