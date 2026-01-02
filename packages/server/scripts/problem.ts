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
    name: '961. 在长度 2N 的数组中找出重复 N 次的元素',
    url: 'https://leetcode.cn/problems/n-repeated-element-in-size-2n-array',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `找出并返回重复了 n 次的那个元素。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 15,
            memory: 18.25,
            desc: '计数',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
