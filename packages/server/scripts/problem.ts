import fs from 'fs-extra';
import type { LeetcodeProblem } from '@bestlyg/core-shared';
import { LeetcodeLevelType, LeetcodeScriptType } from '@bestlyg/core-shared';
import path from 'path';
// import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {Problem} */
export const problem: Omit<LeetcodeProblem, 'solutions'> & {
    exist: boolean;
    solutions: Partial<NonNullable<LeetcodeProblem['solutions']>[number]>[];
} = {
    exist: !true,
    name: '3120. 统计特殊字母的数量 I',
    url: 'https://leetcode.cn/problems/count-the-number-of-special-characters-i',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `给你一个字符串 word。如果 word 中同时出现某个字母 c 的小写形式和大写形式，并且 每个 小写形式的 c 都出现在第一个大写形式的 c 之前，则称字母 c 是一个 特殊字母 。返回 word 中 特殊字母 的数量。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.05.26',
            time: 0,
            memory: 19.22,
            desc: '模拟',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
