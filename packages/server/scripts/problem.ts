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
    name: '611. 有效三角形的个数',
    url: 'https://leetcode.cn/problems/valid-triangle-number',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给定一个包含非负整数的数组 nums ，返回其中可以组成三角形三条边的三元组个数。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 3033,
            memory: 17.63,
            desc: 'dfs',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
