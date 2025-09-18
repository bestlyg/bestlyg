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
    name: '3408. 设计任务管理器',
    url: 'https://leetcode.cn/problems/design-task-manager',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你设计一个 TaskManager 类。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 753,
            memory:135.35,
            desc: '懒堆记录所有事件用户的优先级',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
