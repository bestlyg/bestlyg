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
    name: '1792. 最大平均通过率',
    url: 'https://leetcode.cn/problems/maximum-average-pass-ratio',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回在安排这 extraStudents 个学生去对应班级后的 最大 平均通过率。与标准答案误差范围在 10-5 以内的结果都会视为正确结果。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 1492,
            memory: 53.89,
            desc: '用堆记录当前最应该增加人数的班级',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
