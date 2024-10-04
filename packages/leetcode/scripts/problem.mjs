import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1227. 飞机座位分配概率',
    url: 'https://leetcode.cn/problems/airplane-seat-assignment-probability',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `第 n 位乘客坐在自己的座位上的概率是多少？`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 37,
            memory: 16.34,
            desc: '数学',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
