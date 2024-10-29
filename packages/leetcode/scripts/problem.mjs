import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3211. 生成不含相邻零的二进制字符串',
    url: 'https://leetcode.cn/problems/generate-binary-strings-without-adjacent-zeros',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回所有长度为 n 的 有效 字符串，可以以任意顺序排列。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-09-15',
            time: 52,
            memory:17.8,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
