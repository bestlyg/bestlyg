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
    name: '1590. 使数组和能被 P 整除',
    url: 'https://leetcode.cn/problems/make-sum-divisible-by-p',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回你需要移除的最短子数组的长度，如果无法满足题目要求，返回 -1 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 91,
            memory: 37.45,
            desc: '遍历每一个数字，记录前缀和取模P后的结果',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
