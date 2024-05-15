import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2589. 完成所有任务的最少时间',
    url: 'https://leetcode.cn/problems/minimum-rounds-to-complete-all-tasks',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回完成所有任务需要的 最少 轮数，如果无法完成所有任务，返回 -1 。`,
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
            time: 529,
            memory: 17.4,
            desc: '贪心，对于每个任务先查看当前已经占用的时间点，剩下的从后往前开始占用',
            code: `class Solution:
    def findMinimumTime(self, tasks: List[List[int]]) -> int:
        tasks.sort(key = lambda v: v[1])
        arr = [False] * 2001
        res = 0
        for s, e, d in tasks:
            for t in range(s, e + 1):
                if arr[t]:
                    d -= 1
            if d <= 0: continue
            for t in range(e, s - 1, -1):
                if d <= 0: break
                if not arr[t]:
                    arr[t] = True
                    d -= 1
                    res += 1
        return res`,
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
