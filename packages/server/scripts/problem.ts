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
    name: '757. 设置交集大小至少为2',
    url: 'https://leetcode.cn/problems/set-intersection-size-at-least-two',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回包含集合可能的最小大小。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.19',
            time: 23,
            memory: 19.13,
            desc: '排序后贪心的从后面取',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
