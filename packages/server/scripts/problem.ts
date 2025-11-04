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
    name: '3318. 计算子数组的 x-sum I',
    url: 'https://leetcode.cn/problems/find-x-sum-of-all-k-long-subarrays-i',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回一个长度为 n - k + 1 的整数数组 answer，其中 answer[i] 是 子数组 nums[i..i + k - 1] 的 x-sum。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 31,
            memory: 17.49,
            desc: '遍历每个子数组',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
