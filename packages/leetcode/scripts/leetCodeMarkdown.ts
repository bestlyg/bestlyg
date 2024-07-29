import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '682. 棒球比赛',
    url: 'https://leetcode.cn/problems/baseball-game',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回记录中所有得分的总和。`,
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
            time: 32,
            memory: 16.43,
            desc: '枚举每一个块与另一个块是否位置产生交集',
            code: `class Solution:
    def calPoints(self, operations: List[str]) -> int:
        s = []
        for op in operations:
            if op == '+':
                s.append(s[-1] + s[-2])
            elif op == 'D':
                s.append(s[-1] * 2)
            elif op == 'C':
                s.pop()
            else:
                s.append(int(op))
        return sum(s)`,
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
