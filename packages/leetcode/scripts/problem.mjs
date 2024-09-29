import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist:!true,
    name: '2073. 买票需要的时间',
    url: 'https://leetcode.cn/problems/time-needed-to-buy-tickets',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回位于位置 k（下标从 0 开始）的人完成买票需要的时间（以秒为单位）。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 48,
            memory: 16.57,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
