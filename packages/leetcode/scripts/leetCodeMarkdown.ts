import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2961. 双模幂运算',
    url: 'https://leetcode.cn/problems/double-modular-exponentiation',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回一个由 好下标 组成的数组，顺序不限 。`,
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
            time: 44,
            memory: 16.5,
            desc: '枚举每一个块与另一个块是否位置产生交集',
            code: `class Solution:
    def getGoodIndices(self, variables: List[List[int]], target: int) -> List[int]:
        def f(i: int) -> int:
            a, b, c, m = variables[i]
            return pow(pow(a, b, 10), c, m)
        return [i for i in range(len(variables)) if f(i) == target]`,
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
