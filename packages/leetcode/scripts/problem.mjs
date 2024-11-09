import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3242. 设计相邻元素求和服务',
    url: 'https://leetcode.cn/problems/design-neighbor-sum-service',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个 n x n 的二维数组 grid，它包含范围 [0, n2 - 1] 内的不重复元素。实现 neighborSum 类。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 28,
            memory: 16.89,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
