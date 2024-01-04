import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2397. 被列覆盖的最多行数',
    url: 'https://leetcode.cn/problems/maximum-rows-covered-by-columns',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回一个整数，表示可以由 numSelect 列构成的集合 覆盖 的 最大行数 。`,
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
        //     date: new Date('2021.01.29').getTime(),
        //     script: Script.TS,
        //     time: 352,
        //     memory: 46.7,
        //     desc: '二分',
        //     code: ``,
        // },

        {
            script: Script.PY,
            time: 48,
            memory: 16.85,
            desc: '遍历所有列覆盖的情况',
            code: `class Solution:
    def maximumRows(self, matrix: List[List[int]], numSelect: int) -> int:
        n = len(matrix)
        m = len(matrix[0])
        rows = []
        for i in range(n):
            used = 0
            for j in range(m):
                if matrix[i][j] == 1: used |= 1 << j
            rows.append(used)
        ans = 0
        for used in range(1 << m):
            if bin(used).count('1') != numSelect: continue
            count = sum((rows[i] & used) == rows[i] for i in range(n))
            ans = max(ans, count)
        return ans`,
        },

        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
        // {
        //     script: Script.RUST,
        //     time: 72,
        //     memory: 11.33,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
