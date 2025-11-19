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
    name: '717. 1 比特与 2 比特字符',
    url: 'https://leetcode.cn/problems/1-bit-and-2-bit-characters',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个以 0 结尾的二进制数组 bits ，如果最后一个字符必须是一个一比特字符，则返回 true 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2025.11.19',
            time: 4,
            memory: 18.54,
            desc: 'dfs',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
