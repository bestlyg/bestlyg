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
    name: '3637. 三段式数组 I',
    url: 'https://leetcode.cn/problems/trionic-array-i',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `如果 nums 是三段式数组，返回 true；否则，返回 false。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.02.03',
            time: 148,
            memory:19.19,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
