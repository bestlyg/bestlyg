import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '855. 考场就座',
    url: 'https://leetcode.cn/problems/exam-room',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回区间 [lo, hi] 之间的整数按权重排序后的第 k 个数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-11-01',
            time: 96,
            memory: 21.22,
            
            desc: '有序数组遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
