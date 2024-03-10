import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '299. 猜数字游戏',
    url: 'https://leetcode.cn/problems/find-the-minimum-possible-sum-of-a-beautiful-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回符合条件的美丽数组所可能具备的 最小 和，并对结果进行取模 109 + 7。`,
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
            time: 68,
            memory: 16.65,
            desc: '遍历',
            code: `class Solution:
    def getHint(self, secret: str, guess: str) -> str:
        s1 = []
        s2 = []
        n = len(secret)
        x = y = 0
        for i in range(n):
            if secret[i] == guess[i]:
                x += 1
            else:
                s1.append(secret[i])
                s2.append(guess[i])
        for num in s1:
            if num in s2:
                y += 1
                s2.remove(num)
        return f'{x}A{y}B'`,
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
