import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2644. 找出可整除性得分最大的整数',
    url: 'https://leetcode.cn/problems/find-the-maximum-divisibility-score',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回 在把工人分配到工作岗位后，我们所能获得的最大利润 。`,
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
            time: 4015,
            memory: 16.7,
            desc: '遍历',
            code: `class Solution:
    def maxDivScore(self, nums: List[int], divisors: List[int]) -> int:
        res = 0
        res_num = divisors[0]
        arr = [sum(num % divisor == 0 for num in nums) for divisor in divisors]
        for i in range(len(divisors)):
            if arr[i] >= res:
                if arr[i] > res or arr[i] == res and divisors[i] < res_num:
                    res_num = divisors[i]
                res = arr[i]
        return res_num`,
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
