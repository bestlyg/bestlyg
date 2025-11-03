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
    name: '1578. 使绳子变成彩色的最短时间',
    url: 'https://leetcode.cn/problems/minimum-time-to-make-rope-colorful',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回 Bob 使绳子变成 彩色 需要的 最少时间 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 215,
            memory: 25.8,
            desc: '每个连续的颜色段求时间和，并保留最大时间的气球',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
