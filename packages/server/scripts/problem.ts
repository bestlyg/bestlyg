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
    name: '1356. 根据数字二进制下 1 的数目排序',
    url: 'https://leetcode.cn/problems/sort-integers-by-the-number-of-1-bits',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个整数数组 arr 。请你将数组中的元素按照其二进制表示中数字 1 的数目升序排序。如果存在多个数字二进制中 1 的数目相同，则必须将它们按照数值大小升序排列。请你返回排序后的数组。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.02.07',
            time: 4,
            memory: 19.20,
            desc: '排序',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
