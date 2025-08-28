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
    name: '3446. 按对角线进行矩阵排序',
    url: 'https://leetcode.cn/problems/sort-matrix-by-diagonals',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个大小为 n x n 的整数方阵 grid。返回一个经过如下调整的矩阵：左下角三角形（包括中间对角线）的对角线按 非递增顺序 排序。右上角三角形 的对角线按 非递减顺序 排序。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 4,
            memory: 17.61,
            desc: '按照斜线遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
