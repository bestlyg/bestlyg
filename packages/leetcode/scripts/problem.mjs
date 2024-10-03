import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1928. 规定时间内到达终点的最小花费',
    url: 'https://leetcode.cn/problems/minimum-cost-to-reach-destination-in-time',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你 maxTime，edges 和 passingFees ，请你返回完成旅行的 最小费用 ，如果无法在 maxTime 分钟以内完成旅行，请你返回 -1 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 1579,
            memory: 27.52,
            desc: '按费用进行优先队列',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
