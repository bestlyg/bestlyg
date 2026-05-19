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
    name: '1345. 跳跃游戏 IV',
    url: 'https://leetcode.cn/problems/jump-game-iv',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回到达数组最后一个元素的下标处所需的 最少操作次数 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.05.18',
            time: 24,
            memory: 44.82,
            desc: '取交集后排序',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
