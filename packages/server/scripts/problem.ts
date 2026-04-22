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
    exist:! true,
    name: '2452. 距离字典两次编辑以内的单词',
    url:'https://leetcode.cn/problems/words-within-two-edits-of-dictionary',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回 queries 中的单词列表，这些单词距离 dictionary 中的单词 编辑次数 不超过 两次 。单词返回的顺序需要与 queries 中原本顺序相同。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.19',
            time: 131,
            memory: 18.96,
            desc: '暴力枚举',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
