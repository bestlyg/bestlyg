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
    name: '2657. 找到两个数组的前缀公共数组',
    url: 'https://leetcode.cn/problems/find-the-prefix-common-array-of-two-arrays',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回 A 和 B 的 前缀公共数组 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.05.18',
            time: 7,
            memory: 19.2,
            desc: '二进制存储',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
