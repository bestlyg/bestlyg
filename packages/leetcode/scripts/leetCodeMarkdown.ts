import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2844. 生成特殊数字的最少操作',
    url: 'https://leetcode.cn/problems/minimum-operations-to-make-a-special-number',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回最少需要多少次操作可以使 num 变成特殊数字。`,
    solutions: [
        // {
        //     date: new Date('2020.11.11').getTime(),
        //     script: Script.JS,
        //     time: 140,
        //     memory: 45.82,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.07.25').getTime(),
        //     script: Script.TS,
        //     time: 188,
        //     memory: 39.68,
        //     desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
        //     code: ``,
        // },

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 48,
            memory: 16.51,
            desc: '判断结尾两位是否为特定字符串即可',
            code: `class Solution:
    def minimumOperations(self, num: str) -> int:
        arr = ["00", "25", "50", "75"]
        def run(end_num: str) -> int:
            i = len(num) - 1
            j = len(end_num) - 1
            while i >= 0 and j >= 0:
                if num[i] == end_num[j]: j -= 1
                i -= 1
            if j != -1: return len(num)
            return len(num) - i - 1 - 2
        return min(min(run(end_num) for end_num in arr), len(num) - num.count('0'))`,
        },
        // {
        //     script: Script.RUST,
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
