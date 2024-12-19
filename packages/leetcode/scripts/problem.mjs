import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3285. 找到稳定山的下标',
    url: 'https://leetcode.cn/problems/find-indices-of-stable-mountains',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回一个数组，包含所有 稳定 山的下标，你可以以 任意 顺序返回下标数组。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 0,
            memory: 17.44,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
