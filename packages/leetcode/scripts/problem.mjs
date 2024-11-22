import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3233. 统计不是特殊数字的数字数量',
    url: 'https://leetcode.cn/problems/find-the-count-of-numbers-which-are-not-special',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回区间 [l, r] 内 不是 特殊数字 的数字数量。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 253,
            memory: 16.86,
            desc: '枚举素数，只有素数的乘积才是特殊数字',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
