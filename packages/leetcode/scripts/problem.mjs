import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '3195. 包含所有 1 的最小矩形面积 I',
    url: 'https://leetcode.cn/problems/find-the-minimum-area-to-cover-all-ones-i',
    level: 'Easy',
    tagList: [],
    desc: `给你一个二维 二进制 数组 grid。请你找出一个边在水平方向和竖直方向上、面积 最小 的矩形，并且满足 grid 中所有的 1 都在矩形的内部。返回这个矩形可能的 最小 面积。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 549,
            memory: 53.89,
            desc: '记录存在1的最大边界',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
