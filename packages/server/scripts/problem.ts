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
    name: '1930. 长度为 3 的不同回文子序列',
    url: 'https://leetcode.cn/problems/unique-length-3-palindromic-subsequences',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个字符串 s ，返回 s 中 长度为 3 的不同回文子序列 的个数。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 495,
            memory: 18.05,
            desc: '遍历每一个中间字符，记录存在左右对称的字符',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
