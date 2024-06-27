import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2734. 执行子串操作后的字典序最小字符串',
    url: 'https://leetcode.cn/problems/lexicographically-smallest-string-after-substring-operation',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回执行上述操作 恰好一次 后可以获得的 字典序最小 的字符串。`,
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
            time: 162,
            memory: 22.7,
            desc: '贪心，找第一个a前面的子串进行更新',
            code: `class Solution:
    def smallestString(self, s: str) -> str:
        arr = list(s)
        starti = 0
        while starti < len(arr) and arr[starti] == 'a':
            starti += 1
        if starti == len(arr):
            arr[-1] = 'z'
        else:
            endi = starti + 1
            while endi < len(arr) and arr[endi] != 'a': endi += 1
            for i in range(starti, endi):
                arr[i] = chr(ord(arr[i]) - 1)
        return ''.join(arr)`,
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
