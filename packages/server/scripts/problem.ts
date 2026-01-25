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
    name: '1877. 数组中最大数对和的最小值',
    url: 'https://leetcode.cn/problems/minimize-maximum-pair-sum-in-array',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你在最优数对划分的方案下，返回最小的 最大数对和 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 191,
            memory: 31.24,
            desc: '排序后，头尾相加',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
