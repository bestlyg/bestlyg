import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3250. 单调数组对的数目 I',
    url: 'https://leetcode.cn/problems/find-the-count-of-monotonic-pairs-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回所有 单调 数组对的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 2817,
            memory: 123.61,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
