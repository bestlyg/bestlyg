import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2207. 字符串中最多数目的子序列',
    url: 'https://leetcode.cn/problems/maximize-number-of-subsequences-in-a-string',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回插入一个字符后，text 中最多包含多少个等于 pattern 的 子序列 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 162,
            memory:16.99,
            desc: '遍历时统计两个字符的数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
