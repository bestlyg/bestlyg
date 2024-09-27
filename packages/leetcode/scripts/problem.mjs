import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist:true,
    name: '2516. 每种字符至少取 K 个',
    url: 'https://leetcode.cn/problems/take-k-of-each-character-from-left-and-right',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个由字符 'a'、'b'、'c' 组成的字符串 s 和一个非负整数 k 。每分钟，你可以选择取走 s 最左侧 还是 最右侧 的那个字符。你必须取走每种字符 至少 k 个，返回需要的 最少 分钟数；如果无法取到，则返回 -1 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 1110,
            memory: 16.91,
            desc: '双指针，先假设全部从左侧取值的最大下标，再依次增加右侧取值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
