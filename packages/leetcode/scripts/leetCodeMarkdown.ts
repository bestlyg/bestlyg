import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2079. 给植物浇水',
    url: 'https://leetcode.cn/problems/watering-plants',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的整数数组 plants ，数组由 n 个整数组成。其中，plants[i] 为第 i 株植物需要的水量。另有一个整数 capacity 表示水罐的容量，返回浇灌所有植物需要的 步数 。`,
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
            time: 40,
            memory: 16.53,
            desc: '模拟',
            code: `class Solution:
    def wateringPlants(self, plants: List[int], capacity: int) -> int:
        water = capacity
        res = 0
        for i in range(len(plants)):
            if water < plants[i]:
                water = capacity
                res += i * 2
            water -= plants[i]
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
