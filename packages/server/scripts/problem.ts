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
    name: '2770. 达到末尾下标所需的最大跳跃次数',
    url:'https://leetcode.cn/problems/maximum-number-of-jumps-to-reach-the-last-index',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个下标从 0 开始、由 n 个整数组成的数组 nums 和一个整数 target 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.19',
            time: 503,
            memory: 23.79,
            desc: 'dfs',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
