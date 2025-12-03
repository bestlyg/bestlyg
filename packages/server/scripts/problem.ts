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
    name: '3623. 统计梯形的数目 I',
    url: 'https://leetcode.cn/problems/count-number-of-trapezoids-i',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回可以从 points 中任意选择四个不同点组成的 水平梯形 数量。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 143,
            memory: 62.29,
            desc: '记录每条线存在多少个节点',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
