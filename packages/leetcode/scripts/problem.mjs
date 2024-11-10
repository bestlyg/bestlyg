import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '540. 有序数组中的单一元素',
    url: 'https://leetcode.cn/problems/design-neighbor-sum-service',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个 n x n 的二维数组 grid，它包含范围 [0, n2 - 1] 内的不重复元素。实现 neighborSum 类。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 4,
            memory: 23.52,
            desc: '遍历时用异或去重',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
