import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3258. 统计满足 K 约束的子字符串数量 I',
    url: 'https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回一个整数，表示 s 的所有满足 k 约束 的子字符串的数量。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 124,
            memory: 16.62,
            desc: '遍历每个子串',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
