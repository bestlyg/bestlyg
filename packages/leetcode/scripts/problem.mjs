/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2414. 最长的字母序连续子字符串的长度',
    url: 'https://leetcode.cn/problems/length-of-the-longest-alphabetical-continuous-substring',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个仅由小写英文字母组成的字符串 s ，返回其 最长 的 字母序连续子字符串 的长度。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 460,
            memory: 16.81,
            desc: '一次遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
