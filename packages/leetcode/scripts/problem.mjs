import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1870. 准时到达的列车最小时速',
    url: 'https://leetcode.cn/problems/minimum-speed-to-arrive-on-time',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回能满足你准时到达办公室所要求全部列车的 最小正整数 时速（单位：千米每小时），如果无法准时到达，则返回 -1 。生成的测试用例保证答案不超过 107 ，且 hour 的 小数点后最多存在两位数字 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 1579,
            memory: 27.52,
            desc: '二分答案',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
