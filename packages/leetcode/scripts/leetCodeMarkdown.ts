import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '699. 掉落的方块',
    url: 'https://leetcode.cn/problems/falling-squares',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在每个方块掉落后，你必须记录目前所有已经落稳的 方块堆叠的最高高度 。返回一个整数数组 ans ，其中 ans[i] 表示在第 i 块方块掉落后堆叠的最高高度。`,
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
            time: 407,
            memory: 16.72,
            desc: '枚举每一个块与另一个块是否位置产生交集',
            code: `class Solution:
    def fallingSquares(self, positions: List[List[int]]) -> List[int]:
        n = len(positions)
        harr = [0] * n
        maxh = 0
        res = []
        for i in range(n):
            l1, h1 = positions[i]
            harr[i] = h1
            for j in range(i):
                l2, h2 = positions[j]
                if l1 + h1 - 1 >= l2 and l2 + h2 - 1 >= l1:
                    harr[i] = max(harr[i], harr[j] + h1)
            maxh = max(maxh, harr[i])
            res.append(maxh)
        return res`,
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
