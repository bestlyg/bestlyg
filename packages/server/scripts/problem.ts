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
    name: '1415. 长度为 n 的开心字符串中字典序第 k 小的字符串',
    url: 'https://leetcode.cn/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回排序后的第 k 个开心字符串，如果长度为 n 的开心字符串少于 k 个，那么请你返回 空字符串 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.05',
            time: 3,
            memory: 19.00,
            desc: 'dfs,数量是3*2*2...是个可明确的数量，可以批量计算',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
