import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1338. 数组大小减半',
    url: 'https://leetcode.cn/problems/reduce-array-size-to-the-half',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 至少 能删除数组中的一半整数的整数集合的最小大小。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 65,
            memory: 39.97,
            desc: '计数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
