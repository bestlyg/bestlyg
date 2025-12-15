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
    name: '2110. 股票平滑下跌阶段的数目',
    url: 'https://leetcode.cn/problems/number-of-smooth-descent-periods-of-a-stock',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回 平滑下降阶段 的数目。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 67,
            memory: 29.44,
            desc: '遍历时记录上一个最小平滑下降下标',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
