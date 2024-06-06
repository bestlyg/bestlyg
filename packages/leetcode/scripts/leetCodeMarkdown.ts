import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2938. 区分黑球与白球',
    url: 'https://leetcode.cn/problems/separate-black-and-white-balls',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回「将所有黑色球都移到右侧，所有白色球都移到左侧所需的 最小步数」。`,
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
            time: 104,
            memory: 43.7,
            desc: '贪心把所有0都放左边',
            code: `class Solution:
    def minimumSteps(self, s: str) -> int:
        cnt0 = 0
        res = 0
        for i in range(len(s)):
            if s[i] == '0':
                res += i - cnt0
                cnt0 += 1
        return res`,
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
