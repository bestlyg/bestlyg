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
    name: '796. 旋转字符串',
    url:'https://leetcode.cn/problems/rotate-string',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给定两个字符串, s 和 goal。如果在若干次旋转操作之后，s 能变成 goal ，那么返回 true 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.19',
            time: 0,
            memory: 19.14,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
