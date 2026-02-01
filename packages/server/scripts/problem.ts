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
    name: '3010. 将数组分成最小总代价的子数组 I',
    url: 'https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-i',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回这些子数组的 最小 代价 总和 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.01.27',
            time: 19,
            memory:18.91,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
