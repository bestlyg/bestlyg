import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3194. 最小元素和最大元素的最小平均值',
    url: 'https://leetcode.cn/problems/minimum-average-of-smallest-and-largest-elements',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 averages 中的 最小 元素。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 37,
            memory: 16.45,
            desc: '查找score时同时查找大于当前分数的数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
