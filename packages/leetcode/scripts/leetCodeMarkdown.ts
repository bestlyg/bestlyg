import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2235. 两整数相加',
    url: 'https://leetcode.cn/problems/add-two-integers/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个整数 num1 和 num2，返回这两个整数的和。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 28,
        //     memory: 14.1,
        //     desc: '题目转化为3n个块中，选n个不相邻的块的最大和,dp[i][j]表示存在前i个块时，选取j个块的最大值',
        //     code: ``,
        // },
        // {
        //     script: Script.PY,
        //     time: 444,
        //     memory: 16.19,
        //     desc: '同上',
        //     code: ``,
        // },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.85,
            desc: '加法',
            code: `impl Solution {
    pub fn sum(num1: i32, num2: i32) -> i32 {
        num1 + num2
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
