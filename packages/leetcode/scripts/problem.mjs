import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3191. 使二进制数组全部等于 1 的最少操作次数 I',
    url: 'https://leetcode.cn/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回将 nums 中所有元素变为 1 的 最少 操作次数。如果无法全部变成 1 ，返回 -1 。`,
    solutions: [
        {
            script: LeetCodeScript.SQL,
            // date: '2024-09-15',
            time: 158,
            memory: 20.34,
            desc: '模拟',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
