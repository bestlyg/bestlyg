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
    name: '3186. 施咒的最大总伤害',
    url: 'https://leetcode.cn/problems/maximum-total-damage-with-spell-casting',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回这个魔法师可以达到的伤害值之和的 最大值 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 820,
            memory: 44.46,
            desc: 'dp[i]标识以i为结尾时的最大伤害',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
