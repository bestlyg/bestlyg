import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '2535. 数组元素和与数字和的绝对差',
    url: 'https://leetcode.cn/problems/difference-between-element-sum-and-digit-sum-of-an-array',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 元素和 与 数字和 的绝对差。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 82,
            memory: 16.44,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
