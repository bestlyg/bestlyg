import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '1277. 统计全为 1 的正方形子矩阵',
    url: 'https://leetcode.cn/problems/count-square-submatrices-with-all-ones',
    level: 'Easy',
    tagList: [],
    desc: `给你一个 m * n 的矩阵，矩阵中的元素不是 0 就是 1，请你统计并返回其中完全由 1 组成的 正方形 子矩阵的个数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 163,
            memory: 22.04,
            desc: '前缀和记录以当前点为结尾的总和',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
