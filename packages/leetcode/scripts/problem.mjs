import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3180. 执行操作可获得的最大总奖励 I',
    url: 'https://leetcode.cn/problems/maximum-total-reward-using-operations-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `以整数形式返回执行最优操作能够获得的 最大 总奖励。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-09-15',
            time: 4026,
            memory: 763.09,
            desc: '去重后dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
