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
    name: '3516. 找到最近的人',
    url: 'https://leetcode.cn/problems/find-closest-person',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `第 1 个人和第 2 个人以 相同 的速度向第 3 个人移动。判断谁会 先 到达第 3 个人的位置。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 0,
            memory: 17.64,
            desc: '直接计算',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
