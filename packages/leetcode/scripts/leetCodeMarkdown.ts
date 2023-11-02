import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2103. 环和杆',
    url: 'https://leetcode.cn/problems/rings-and-rods',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `找出所有集齐 全部三种颜色 环的杆，并返回这种杆的数量。`,
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
        //     time: 64,
        //     memory: 31.09,
        //     desc: '排序后计算间隔',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 40,
            memory: 15.66,
            desc: '遍历',
            code: `class Solution:
    def countPoints(self, rings: str) -> int:
        map = { 'R': 0, 'G': 1, 'B': 2}
        arr = [0] * 10
        for i in range(0, len(rings), 2):
            arr[int(rings[i + 1])] |= 1 << map[rings[i]]
        return sum(v == 0b111 for v in arr)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 16,
        //     memory: 4.29,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
