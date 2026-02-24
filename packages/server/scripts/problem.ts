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
    name: '1022. 从根到叶的二进制数之和',
    url: 'https://leetcode.cn/problems/sum-of-root-to-leaf-binary-numbers',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `对树上的每一片叶子，我们都要找出从根到该叶子的路径所表示的数字。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.02.07',
            time: 3,
            memory: 19.21,
            desc: 'dfs',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
