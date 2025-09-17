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
    name: '2349. 设计数字容器系统',
    url: 'https://leetcode.cn/problems/design-a-number-container-system',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `设计一个数字容器系统，可以实现以下功能：在系统中给定下标处 插入 或者 替换 一个数字。返回 系统中给定数字的最小下标。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 195,
            memory: 80.1,
            desc: '用堆存储每个数字下最小的下标',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
