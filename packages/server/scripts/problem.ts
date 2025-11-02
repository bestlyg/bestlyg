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
    name: '3289. 数字小镇中的捣蛋鬼',
    url: 'https://leetcode.cn/problems/the-two-sneaky-numbers-of-digitville',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回一个长度为 2 的数组，包含这两个数字（顺序任意）。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2025.10.31',
            time: 3,
            memory: 17.45,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
