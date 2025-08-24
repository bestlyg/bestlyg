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
    name: '1493. 删掉一个元素以后全为 1 的最长子数组',
    url: 'https://leetcode.cn/problems/longest-subarray-of-1s-after-deleting-one-element',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个二进制数组 nums ，你需要从中删掉一个元素。请你在删掉元素的结果数组中，返回最长的且只包含 1 的非空子数组的长度。如果不存在这样的子数组，请返回 0 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 74,
            memory: 21.2,
            desc: '滑动窗口',
            code: await fs.readFile(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
