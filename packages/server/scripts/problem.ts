import '@bestlyg/cli/globals';
import fs from 'fs-extra';
import {
    Ledger,
    LeetcodeProblem,
    Xuan,
    LeetcodeSolution,
    LeetcodeLevelType,
    LeetcodeScriptType,
} from '../external';
import path from 'path';
// import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {Problem} */
export const problem: LeetcodeProblem & { exist: boolean } = {
    exist: !true,
    name: '3461. 判断操作后字符串中的数字是否相等 I',
    url: 'https://leetcode.cn/problems/check-if-digits-are-equal-in-string-after-operations-i',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `如果 s 最后剩下的两个数字 相同 ，返回 true 。否则，返回 false。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.15',
            time: 91,
            memory:17.70,
            desc: '递归',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
