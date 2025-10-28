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
    name: '3354. 使数组元素等于零',
    url: 'https://leetcode.cn/problems/make-array-elements-equal-to-zero',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回可能的有效选择方案数目。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.15',
            time: 41,
            memory: 17.73,
            desc: '判断0的左右数据总和',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
