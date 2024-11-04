import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '633. 平方数之和',
    url: 'https://leetcode.cn/problems/number-of-bit-changes-to-make-two-integers-equal',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你两个正整数 n 和 k。你可以选择 n 的 二进制表示 中任意一个值为 1 的位，并将其改为 0。返回使得 n 等于 k 所需要的更改次数。如果无法实现，返回 -1。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 183,
            memory: 16.25,
            desc: '遍历每一个数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
