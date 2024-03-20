import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1969. 数组元素的最小非零乘积',
    url: 'https://leetcode.cn/problems/minimum-non-zero-product-of-the-array-elements/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你算出进行以上操作 任意次 以后，nums 能得到的 最小非零 乘积。`,
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
            time: 51,
            memory: 16.3,
            desc: '除去最大值，其他值都能两两匹配成最大值减1和1，快速计算',
            code: `def quick_mul(a: int, b: int, mod: int) -> int:
        ans = 0
        temp = a
        while b:
            if b & 1: ans = (ans + temp) % mod
            temp = (temp + temp) % mod
            b >>= 1
        return ans
    
    def quick_pow(a: int, b: int, mod: int) -> int:
        ans = 1
        temp = a
        while b:
            if b & 1: ans = quick_mul(ans, temp, mod)
            temp = quick_mul(temp, temp, mod)
            b >>= 1
        return ans
    
    class Solution:
        def minNonZeroProduct(self, p: int) -> int:
            num = 2 ** p - 1
            mod = 10 ** 9 + 7
            return quick_pow(num - 1, num // 2, mod) * num % mod`,
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
