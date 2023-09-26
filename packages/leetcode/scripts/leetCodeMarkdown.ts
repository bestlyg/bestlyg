import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2582. 递枕头',
    url: 'https://leetcode.cn/problems/pass-the-pillow',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个正整数 n 和 time ，返回 time 秒后拿着枕头的人的编号。`,
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
        {
            script: Script.CPP,
            time: 0,
            memory: 6.1,
            desc: '遍历',
            code: `class Solution {
public:
    int passThePillow(int n, int time) {
        int cur = 1, d = 1;
        while (time--) {
            cur += d;
            if (cur == n || cur == 1) d *= -1;
        }
        return cur;
    }
};`,
        },
        {
            script: Script.PY,
            time: 720,
            memory: 77.2,
            desc: '同上',
            code: `class Solution:
    def passThePillow(self, n: int, time: int) -> int:
        cur = 1
        d = 1
        while time:
            cur += d
            if cur == n or cur == 1: d *= -1
            time -= 1
        return cur`,
        },
                {
                    script: Script.RUST,
                    time: 0,
                    memory:1.93,
                    desc: '同上',
                    code: `impl Solution {
    pub fn pass_the_pillow(n: i32, mut time: i32) -> i32 {
        let mut cur = 1;
        let mut d = 1;
        while time > 0 {
            cur += d;
            if cur == n || cur == 1 {
                d *= -1;
            }
            time -= 1;
        }
        cur
    }
}`,
                },
    ],
};

export default leetCodeMarkdown;
