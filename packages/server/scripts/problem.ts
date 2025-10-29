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
    name: '3370. 仅含置位位的最小整数',
    url: 'https://leetcode.cn/problems/smallest-number-with-all-set-bits',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回 大于等于 n 且二进制表示仅包含 置位 位的 最小 整数 x 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.15',
            time: 0,
            memory: 17.62,
            desc: '找最高位1',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
