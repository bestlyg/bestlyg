import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1997. 访问完所有房间的第一天',
    url: 'https://leetcode.cn/problems/first-day-where-you-have-been-in-all-the-rooms/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请返回你访问完所有房间的第一天的日期编号。题目数据保证总是存在这样的一天。`,
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
            time: 289,
            memory: 39.05,
            desc: 'dp[i][0]表示第i个数,第一次奇数访问的天数，dp[i][1]表示第i个数,第一次偶数访问的天数',
            code: `class Solution:
    def firstDayBeenInAllRooms(self, nextVisit: List[int]) -> int:
        n = len(nextVisit)
        dp = [[0, 1] for _ in range(n)]
        mod = 10 ** 9 + 7
        for i in range(1, n):
            dp[i][0] = (dp[i - 1][1] + 1) % mod
            dp[i][1] = (dp[i][0] * 2 + 1 - dp[nextVisit[i]][0]) % mod
        return dp[n - 1][0]`,
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
