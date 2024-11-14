import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3249. 统计好节点的数目',
    url: 'https://leetcode.cn/problems/count-the-number-of-good-nodes',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回给定树中 好节点 的数量。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 1048,
            memory: 126.92,
            desc: 'dfs遍历每个子树',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
