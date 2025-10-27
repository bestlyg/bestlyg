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
    name: '2125. 银行中的激光束数量',
    url: 'https://leetcode.cn/problems/number-of-laser-beams-in-a-bank',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回银行中激光束的总数量。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.15',
            time: 13,
            memory: 19.45,
            desc: '模拟',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
