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
    name: '3346. 执行操作后元素的最高频率 I',
    url: 'https://leetcode.cn/problems/maximum-frequency-of-an-element-after-performing-operations-i',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `在执行完所有操作以后，请你返回 nums 中出现 频率最高 元素的出现次数。一个元素 x 的 频率 指的是它在数组中出现的次数。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.15',
            time: 767,
            memory: 32.78,
            desc: '二分查找区间',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
