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
    name: '61. 旋转链表',
    url:'https://leetcode.cn/problems/rotate-list',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.19',
            time: 3,
            memory: 19.04,
            desc: '记录新头节点进行重新组装',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
