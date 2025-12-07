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
    name: '1523. 在区间范围内统计奇数数目',
    url: 'https://leetcode.cn/problems/count-odd-numbers-in-an-interval-range',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你两个非负整数 low 和 high 。请你返回 low 和 high 之间（包括二者）奇数的数目。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 0,
            memory: 17.68,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
