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
    name: '2197. 替换数组中的非互质数',
    url: 'https://leetcode.cn/problems/replace-non-coprime-numbers-in-array',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个整数数组 nums 。请你对数组执行下述操作：返回修改后得到的 最终 数组。可以证明的是，以 任意 顺序替换相邻的非互质数都可以得到相同的结果。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 166,
            memory: 31.51,
            desc: '遍历时用栈存储',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
