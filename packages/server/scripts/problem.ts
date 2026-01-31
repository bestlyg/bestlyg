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
    name: '744. 寻找比目标字母大的最小字母',
    url: 'https://leetcode.cn/problems/find-smallest-letter-greater-than-target',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回 letters 中大于 target 的最小的字符。如果不存在这样的字符，则返回 letters 的第一个字符。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.01.27',
            time: 0,
            memory:20.68,
            desc: '二分查找',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
