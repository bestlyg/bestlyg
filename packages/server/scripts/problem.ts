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
    name: '3005. 最大频率元素计数',
    url: 'https://leetcode.cn/problems/count-elements-with-maximum-frequency',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个由 正整数 组成的数组 nums 。返回数组 nums 中所有具有 最大 频率的元素的 总频率 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 3,
            memory: 17.77,
            desc: '计数',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
