import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2545. 根据第 K 场考试的分数排序',
    url: 'https://leetcode.cn/problems/sort-the-students-by-their-kth-score',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回字符串 t 的 最小 可能长度。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 8,
            memory: 22.1,
            desc: '排序',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
