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
    name: '1317. 将整数转换为两个无零整数的和',
    url: 'https://leetcode.cn/problems/convert-integer-to-the-sum-of-two-no-zero-integers',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个整数 n，请你返回一个 由两个整数组成的列表 [a, b]，满足：a 和 b 都是无零整数a + b = n题目数据保证至少有一个有效的解决方案。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 0,
            memory: 17.55,
            desc: '直接计算',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
