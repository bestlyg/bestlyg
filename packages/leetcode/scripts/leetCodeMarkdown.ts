import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:! true,
    name: '2651. 计算列车到站时间',
    url: 'https://leetcode.cn/problems/calculate-delayed-arrival-time',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正整数 arrivalTime 表示列车正点到站的时间（单位：小时），另给你一个正整数 delayedTime 表示列车延误的小时数。返回列车实际到站的时间。`,
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
        {
            script: Script.CPP,
            time: 0,
            memory: 2.1,
            desc: '相加后取模',
            code: `class Solution {
public:
    int findDelayedArrivalTime(int arrivalTime, int delayedTime) {
        return (arrivalTime + delayedTime) % 24;
    }
};`,
        },
        {
            script: Script.PY,
            time: 48,
            memory: 16.1,
            desc: '同上',
            code: `class Solution:
    def findDelayedArrivalTime(self, arrivalTime: int, delayedTime: int) -> int:
        return (arrivalTime + delayedTime) % 24`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.98,
            desc: '同上',
            code: `impl Solution {
    pub fn find_delayed_arrival_time(arrival_time: i32, delayed_time: i32) -> i32 {
        (arrival_time + delayed_time) % 24
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
