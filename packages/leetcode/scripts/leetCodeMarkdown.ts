import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1976. 到达目的地的方案数',
    url: 'https://leetcode.cn/problems/number-of-ways-to-arrive-at-destination/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请返回花费 最少时间 到达目的地的 路径数目 。`,
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
            time: 59,
            memory: 23.55,
            desc: '最短路遍历时同时记录当前的最大cnt',
            code: `class Solution:
    def countPaths(self, n: int, roads: List[List[int]]) -> int:
        nodes = [[] for _ in range(n)]
        for n1, n2, time in roads:
            nodes[n1].append((n2, time))
            nodes[n2].append((n1, time))
        time_map = [inf] * n
        time_map[0] = 0
        cnt_map = [0] * n
        cnt_map[0] = 1
        heap = [(0, 0)]
        while heap:
            time, node = heappop(heap)
            if time > time_map[node]: continue
            for child, time2 in nodes[node]:
                next_time = time + time2
                if next_time == time_map[child]:
                    cnt_map[child] = (cnt_map[node] + cnt_map[child]) % (10 ** 9 + 7)
                elif next_time < time_map[child]:
                    time_map[child] = next_time
                    cnt_map[child] = cnt_map[node]
                    heappush(heap, (next_time, child))
        return cnt_map[n - 1]`,
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
