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
    name: '3212. 统计 X 和 Y 频数相等的子矩阵数量',
    url:'https://leetcode.cn/problems/count-submatrices-with-equal-frequency-of-x-and-y',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个二维字符矩阵 grid，其中 grid[i][j] 可能是 'X'、'Y' 或 '.'，返回满足以下条件的子矩阵数量。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.03.19',
            time: 1722,
            memory: 222.96,
            desc: '二维前缀和',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
