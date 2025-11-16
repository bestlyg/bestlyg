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
    name: '1513. 仅含 1 的子串数',
    url: 'https://leetcode.cn/problems/number-of-substrings-with-only-1s',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回所有字符都为 1 的子字符串的数目。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 7,
            memory:18.46,
            desc: '每遍历到一串0，就把前面每个1移动一次',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
