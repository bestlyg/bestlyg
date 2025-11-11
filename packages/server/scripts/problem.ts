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
    name: '474. 一和零',
    url: 'https://leetcode.cn/problems/ones-and-zeroes',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 1815,
            memory: 302.77,
            desc: '递归遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
