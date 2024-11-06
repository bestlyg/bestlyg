import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3254. 长度为 K 的子数组的能量值 I',
    url: 'https://leetcode.cn/problems/find-the-power-of-k-size-subarrays-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回一个长度为 n - k + 1 的整数数组 results ，其中 results[i] 是子数组 nums[i..(i + k - 1)] 的能量值。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 0,
            memory: 16.63,
            desc: '遍历时同时记录当前值与前面值是否符合要求',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
