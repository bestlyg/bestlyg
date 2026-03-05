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
    name: '1582. 二进制矩阵中的特殊位置',
    url: 'https://leetcode.cn/problems/special-positions-in-a-binary-matrix',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给定一个 m x n 的二进制矩阵 mat，返回矩阵 mat 中特殊位置的数量。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.03.05',
            time: 115,
            memory: 19.58,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
