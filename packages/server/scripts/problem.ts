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
    name: '2785. 将字符串中的元音字母排序',
    url: 'https://leetcode.cn/problems/sort-vowels-in-a-string',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个下标从 0 开始的字符串 s ，将 s 中的元素重新 排列 得到新的字符串 t 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 127,
            memory: 20.23,
            desc: '获取所有元音进行排序',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
