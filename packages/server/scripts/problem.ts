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
    exist:! true,
    name: '1784. 检查二进制字符串字段',
    url: 'https://leetcode.cn/problems/check-if-binary-string-has-at-most-one-segment-of-ones',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个二进制字符串 s ，该字符串 不含前导零 。如果 s 包含 零个或一个由连续的 '1' 组成的字段 ，返回 true​​​ 。否则，返回 false 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.05',
            time: 3,
            memory: 19.00,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
