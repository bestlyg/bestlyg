import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '908. 最小差值 I',
    url: 'https://leetcode.cn/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回将 nums 中所有元素变为 1 的 最少 操作次数。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-09-15',
            time: 12,
            memory: 17.36,
            desc: '排序后直接判断最大值和最小值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
