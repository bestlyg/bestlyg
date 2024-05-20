import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1542. 找出最长的超赞子字符串',
    url: 'https://leetcode.cn/problems/find-longest-awesome-substring',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个字符串 s 。请返回 s 中最长的 超赞子字符串 的长度。`,
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
            time: 858,
            memory: 16.84,
            desc: '利用二进制存储便利过的奇偶',
            code: `class Solution:
    def longestAwesome(self, s: str) -> int:
        n = len(s)
        res = 0
        cur = 0
        map = { 0: -1 }
        for i in range(n):
            num = ord(s[i]) - ord('0')
            cur ^= 1 << num
            for offset in range(10):
                v = cur ^ (1 << offset)
                if v in map:
                    res = max(res, i - map[v])
            if cur in map:
                res = max(res, i - map[cur])
            else:
                map[cur] = i
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
