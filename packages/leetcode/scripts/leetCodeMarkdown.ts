import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2580. 统计将重叠区间合并成组的方案数',
    url: 'https://leetcode.cn/problems/count-ways-to-group-overlapping-ranges',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回将 ranges 划分成两个组的 总方案数 。`,
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
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 120,
            memory: 45.1,
            desc: '并查集合并区间',
            code: `class UnionFind:
        def __init__(self, n) -> None:
            self.n = n
            self.data = [i for i in range(0, n)]
            self.sizes = [1] * n
            self.cnt = n
        def size(self, v: int) -> int:
            return self.sizes[self.find(v)]
        def find(self, v: int) -> int:
            if self.data[v] != v:
                self.data[v] = self.find(self.data[v])
            return self.data[v]
        def uni(self, v1: int, v2: int):
            p1 = self.find(v1)
            p2 = self.find(v2)
            if p1 != p2:
                self.sizes[p1] += self.sizes[p2]
                self.cnt -= self.sizes[p2]
                self.data[p2] = p1
        def same(self, v1: int, v2: int):
            return self.find(v1) == self.find(v2)
    class Solution:
        def countWays(self, ranges: List[List[int]]) -> int:
            n = len(ranges)
            ranges.sort()
            uf = UnionFind(n)
            idx = 0
            while idx < n:
                start, end = ranges[idx]
                while idx + 1 < n and ranges[idx + 1][0] <= end:
                    end = max(end, ranges[idx + 1][1])
                    uf.uni(idx, idx + 1)
                    idx += 1
                idx += 1
            return (2 ** uf.cnt) % (10 ** 9 + 7)`,
        },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 94,
            memory: 45.06,
            desc: '排序后合并区间',
            code: `class Solution:
    def countWays(self, ranges: List[List[int]]) -> int:
        n = len(ranges)
        ranges.sort()
        idx = 0
        cnt = 0
        while idx < n:
            start, end = ranges[idx]
            cnt += 1
            while idx + 1 < n and ranges[idx + 1][0] <= end:
                end = max(end, ranges[idx + 1][1])
                idx += 1
            idx += 1
        return pow(2, cnt, 10 ** 9 + 7)`,
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
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
