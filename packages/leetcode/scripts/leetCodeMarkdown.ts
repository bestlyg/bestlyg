import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '605. 种花问题',
    url: 'https://leetcode.cn/problems/earliest-possible-day-of-full-bloom',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 240,
        //     memory: 82.55,
        //     desc: '排序后遍历，差分数组记录当前值',
        //     code: ``,
        // },
        {
            date: new Date('2023.09.29').getTime(),
            script: Script.PY,
            time: 60,
            memory: 16.3,
            desc: '同上',
            code: `class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        prev = -1
        for i in range(len(flowerbed)):
            if flowerbed[i] == 0:
                if prev + 1 == i and (i == len(flowerbed) - 1 or flowerbed[i + 1] == 0):
                    n -= 1
                else:
                    prev = i
        return n <= 0
`,
        },
        // {
        //     script: Script.RUST,
        //     time: 48,
        //     memory: 6.7,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
