import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist:!true,
    name: '1845. 座位预约管理系统',
    url: 'https://leetcode.cn/problems/seat-reservation-manager',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回位于位置 k（下标从 0 开始）的人完成买票需要的时间（以秒为单位）。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 423,
            memory: 45.07,
            desc: 'heap',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
