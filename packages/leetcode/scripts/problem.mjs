import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '118. 杨辉三角',
    url: 'https://leetcode.cn/problems/pascals-triangle',
    level: 'Easy',
    tagList: [],
    desc: `给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory:17.46,
            desc: '枚举',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
