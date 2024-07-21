import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2850. 将石头分散到网格图的最少移动次数',
    url: 'https://leetcode.cn/problems/minimum-moves-to-spread-stones-over-grid',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回每个格子恰好有一个石头的 最少移动次数 。`,
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
            time: 56,
            memory: 16.36,
            desc: '暴力枚举',
            code: `class Solution:
    def minimumMoves(self, grid: List[List[int]]) -> int:
        arr1 = [(i, j, grid[i][j]) for i in range(3) for j in range(3) if grid[i][j] > 1]
        arr0 = [(i, j) for i in range(3) for j in range(3) if grid[i][j] == 0]
        self.res = inf
        def dfs(i0: int, cur: int = 0) -> int:
            if i0 == len(arr0): self.res = min(self.res, cur)
            else:
                for i1 in range(len(arr1)):
                    old_item = arr1[i1]
                    if old_item[2] > 1:
                        arr1[i1] = (old_item[0], old_item[1], old_item[2] - 1)
                        dfs(i0 + 1, cur + abs(old_item[0] - arr0[i0][0]) + abs(old_item[1] - arr0[i0][1]))
                        arr1[i1] = old_item
        dfs(0)
        return self.res`,
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
