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
    name: '762. 二进制表示中质数个计算置位',
    url: 'https://leetcode.cn/problems/prime-number-of-set-bits-in-binary-representation',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你两个整数 left 和 right ，在闭区间 [left, right] 范围内，统计并返回 计算置位位数为质数 的整数个数。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.02.07',
            time: 115,
            memory: 19.21,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
