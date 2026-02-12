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
    name: '1653. 使字符串平衡的最少删除次数',
    url: 'https://leetcode.cn/problems/minimum-deletions-to-make-string-balanced',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回使 s 平衡 的 最少 删除次数。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.02.07',
            time: 467,
            memory: 19.91,
            desc: '遍历的同时计数，假设当前节点做第一个b时的值',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
