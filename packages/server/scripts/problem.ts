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
    name: '2169. 得到 0 的操作数',
    url: 'https://leetcode.cn/problems/count-operations-to-obtain-zero',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回使 num1 = 0 或 num2 = 0 的 操作数 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 143,
            memory: 37.82,
            desc: '递归遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
