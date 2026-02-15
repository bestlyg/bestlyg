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
    exist: true,
    name: '67. 二进制求和',
    url: 'https://leetcode.cn/problems/add-binary',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.02.07',
            time: 0,
            memory: 19.21,
            desc: '直接计算',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
