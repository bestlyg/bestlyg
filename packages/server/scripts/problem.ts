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
    name: '3075. 幸福值最大化的选择方案',
    url: 'https://leetcode.cn/problems/maximize-happiness-of-selected-children',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `在每一轮选择一个孩子时，所有 尚未 被选中的孩子的 幸福值 将减少 1 。注意，幸福值 不能 变成负数，且只有在它是正数的情况下才会减少。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 163,
            memory: 40.01,
            desc: '排序后从大忘小遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
