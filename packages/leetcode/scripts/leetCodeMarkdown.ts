import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2101. 引爆最多的炸弹',
    url: 'https://leetcode.cn/problems/detonate-the-maximum-bombs',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你数组 bombs ，请你返回在引爆 一个 炸弹的前提下，最多 能引爆的炸弹数目。`,
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
            time: 510,
            memory: 17.08,
            desc: '遍历存储所有爆炸链接后dfs',
            code: `class Solution:
    def maximumDetonation(self, bombs: List[List[int]]) -> int:
        n = len(bombs)
        nexts = [[] for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if i != j:
                    if (bombs[i][0] - bombs[j][0]) ** 2 + (bombs[i][1] - bombs[j][1]) ** 2 <= bombs[i][2] ** 2:
                        nexts[i].append(j)
        def dfs(cur: int, used: List[bool]) -> int:
            used[cur] = True
            return sum(
                dfs(next, used)
                for next in nexts[cur]
                if not used[next]
            ) + 1
        return max(dfs(i, [False] * n) for i in range(n))`,
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
