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
    name: '3043. 最长公共前缀的长度',
    url: 'https://leetcode.cn/problems/find-the-length-of-the-longest-common-prefix',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回所有数对之中最长公共前缀的长度。如果它们之间不存在公共前缀，则返回 0 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.05.18',
            time: 387,
            memory: 35.92,
            desc: '前缀树存储',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
