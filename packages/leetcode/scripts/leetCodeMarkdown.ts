import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1738. 找出第 K 大的异或坐标值',
    url: 'https://leetcode.cn/problems/find-kth-largest-xor-coordinate-value',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你找出 matrix 的所有坐标中第 k 大的值（k 的值从 1 开始计数）。`,
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
            time: 770,
            memory: 61.8,
            desc: '前缀和存储异或值后，利用堆排序',
            code: `class Solution:
    def kthLargestValue(self, matrix: List[List[int]], k: int) -> int:
        n, m = len(matrix), len(matrix[0])
        sums = [[0] * (m + 1) for _ in range(n + 1)]
        q = []
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                sums[i][j] = sums[i - 1][j] ^ sums[i][j - 1] ^ sums[i - 1][j - 1] ^ matrix[i - 1][j - 1]
                heappush(q, -sums[i][j])
        for _ in range(k - 1): heappop(q)
        return -q[0]`,
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
