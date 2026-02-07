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
    name: '3379. 转换数组',
    url: 'https://leetcode.cn/problems/transformed-array',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回新数组 result。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.02.05',
            time: 61,
            memory: 18.91,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
