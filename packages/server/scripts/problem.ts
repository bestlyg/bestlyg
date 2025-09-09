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
    name: '2327. 知道秘密的人数',
    url: 'https://leetcode.cn/problems/number-of-people-aware-of-a-secret',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个整数 n ，请你返回在第 n 天结束时，知道秘密的人数。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 3,
            memory: 17.60,
            desc: '存储遗忘队列和等待队列',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
