import fs from 'fs-extra';
import type { LeetcodeProblem } from '@bestlyg/core-shared';
import { LeetcodeLevelType, LeetcodeScriptType } from '@bestlyg/core-shared';
import path from 'path';
// import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {Problem} */
export const problem: LeetcodeProblem & { exist: boolean } = {
    exist: true,
    name: '1752. 检查数组是否经排序和轮转得到',
    url: 'https://leetcode.cn/problems/check-if-array-is-sorted-and-rotated',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `如果 nums 能够由源数组轮转若干位置（包括 0 个位置）得到，则返回 true ；否则，返回 false 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.05.18',
            time: 0,
            memory: 18.94,
            desc: '复制一份拼接，判断有序有是否为子串',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
