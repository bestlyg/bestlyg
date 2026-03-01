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
    name: '1689. 十-二进制数的最少数目',
    url: 'https://leetcode.cn/problems/partitioning-into-minimum-number-of-deci-binary-numbers',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个表示十进制整数的字符串 n ，返回和为 n 的 十-二进制数 的最少数目。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.02.07',
            time: 89,
            memory: 19.75,
            desc: '贪心，取str中最大的数字',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
