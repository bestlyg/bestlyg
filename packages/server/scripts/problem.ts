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
    name: '2536. 子矩阵元素加 1',
    url: 'https://leetcode.cn/problems/increment-submatrices-by-one',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回执行完所有操作后得到的矩阵 mat 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 186,
            memory: 39.88,
            desc: '每遍历到一串0，就把前面每个1移动一次',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
