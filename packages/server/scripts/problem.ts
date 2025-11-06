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
    name: '3607. 电网维护',
    url: 'https://leetcode.cn/problems/power-grid-maintenance',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回一个整数数组，表示按照查询中出现的顺序，所有类型为 [1, x] 的查询结果。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 1187,
            memory: 109.22,
            desc: '并查集记录每一个网，然后有序数组记录每一个组里最小的',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
