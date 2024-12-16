import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1847. 最近的房间',
    url: 'https://leetcode.cn/problems/closest-room',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回长度为 k 的数组 answer ，其中 answer[j] 为第 j 个查询的结果。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 233,
            memory: 58.32,
            desc: '有序数组',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
