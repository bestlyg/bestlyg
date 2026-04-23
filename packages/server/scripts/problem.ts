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
    name: '2615. 等值距离和',
    url:'https://leetcode.cn/problems/sum-of-distances',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个下标从 0 开始的整数数组 nums 。现有一个长度等于 nums.length 的数组 arr 。对于满足 nums[j] == nums[i] 且 j != i 的所有 j ，arr[i] 等于所有 |i - j| 之和。如果不存在这样的 j ，则令 arr[i] 等于 0 。返回数组 arr 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.19',
            time: 116,
            memory: 53.25,
            desc: '记录所有相同的下标的数组，遍历下标的时候记录左右的sum数量',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
