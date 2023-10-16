import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2652. 倍数求和',
    url: 'https://leetcode.cn/problems/sum-multiples',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正整数 n ，请你计算在 [1，n] 范围内能被 3、5、7 整除的所有整数之和。返回一个整数，用于表示给定范围内所有满足约束条件的数字之和。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 9.2,
        //     desc: '双指针',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 92,
            memory: 16,
            desc: '遍历',
            code: `class Solution:
    def sumOfMultiples(self, n: int) -> int:
        return sum(
            list(
                filter(
                    lambda num: num % 3 == 0 or num % 5 == 0 or num % 7 == 0, 
                    [num for num in range(1, n + 1)]
                )
            )
        )`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.12,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
