import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2959. 关闭分部的可行集合数目',
    url: 'https://leetcode.cn/problems/number-of-possible-sets-of-closing-branches',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回关闭分部的可行方案数目，满足每个方案里剩余分部之间的最远距离不超过 maxDistance。`,
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
            time: 1863,
            memory: 16.52,
            desc: '枚举所有可能，用短路算法求出两地之间的最短路径',
            code: `class Solution:
    def numberOfSets(self, n: int, maxDistance: int, roads: List[List[int]]) -> int:
        def check(mask: int) -> int:
            d = [[inf for _ in range(n)] for _ in range(n)]
            for n1, n2, w in roads: d[n1][n2] = d[n2][n1] = min(d[n1][n2], d[n2][n1], w)
            for k in range(n):
                if mask & (1 << k):
                    for i in range(n):
                        if mask & (1 << k):
                            for j in range(n):
                                if mask & (1 << j):
                                    d[i][j] = d[j][i] = min(d[i][j], d[i][k] + d[k][j])
            for i in range(n):
                if mask & (1 << i):
                    for j in range(i):
                        if mask & (1 << j):
                            if d[i][j] > maxDistance:
                                return False
            return True
        return sum(check(i) for i in range(2 ** n))`,
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
