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
    name: '3021. Alice 和 Bob 玩鲜花游戏',
    url: 'https://leetcode.cn/problems/alice-and-bob-playing-flower-game',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回满足题目描述的数对 (x, y) 的数目。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 0,
            memory: 17.69,
            desc: '如果是奇数，alice就能赢',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
