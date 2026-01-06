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
    name: '1161. 最大层内元素和',
    url: 'https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回总和 最大 的那一层的层号 x。如果有多层的总和一样大，返回其中 最小 的层号 x。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 28,
            memory: 22.54,
            desc: '层序遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
