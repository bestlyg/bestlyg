import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1235. 规划兼职工作',
    url: 'https://leetcode.cn/problems/average-salary-excluding-the-minimum-and-maximum-salary',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回去掉最低工资和最高工资以后，剩下员工工资的平均值。`,
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
            time: 195,
            memory: 34.35,
            desc: '记录当前开始时间以前结束的收益最高的任务',
            code: `class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        n = len(startTime)
        arr = sorted([i for i in range(n)], key = lambda i: startTime[i])
        q = []
        wait_q = []
        dp = [profit[arr[i]] for i in range(n)]
        for i in range(0, n):
            idx = arr[i]
            while wait_q and wait_q[0][0] <= startTime[idx]:
                wait_idx = heappop(wait_q)[1]
                heappush(q, (-dp[wait_idx], wait_idx))
            if q: dp[i] += -q[0][0]
            heappush(wait_q, (endTime[idx], i))
        return max(dp)`,
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
