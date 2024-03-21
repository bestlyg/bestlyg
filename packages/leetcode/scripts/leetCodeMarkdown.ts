import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2671. 频率跟踪器',
    url: 'https://leetcode.cn/problems/frequency-tracker/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你设计并实现一个能够对其中的值进行跟踪的数据结构，并支持对频率相关查询进行应答。`,
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
            time: 374,
            memory: 81.89,
            desc: '利用两个dict记录数量和频率',
            code: `class FrequencyTracker:
    def __init__(self):
        self.freq_map = {}
        self.cnt_map = {}
    
    def del_freq(self, freq: int, number: int):
        if freq in self.freq_map and number in self.freq_map[freq]:
            self.freq_map[freq].remove(number)
            if not len(self.freq_map[freq]): del self.freq_map[freq]

    def add_freq(self, freq: int, number: int):
        if freq not in self.freq_map: self.freq_map[freq] = set()
        if number not in self.freq_map[freq]: self.freq_map[freq].add(number)

    def add(self, number: int) -> None:
        if number not in self.cnt_map: self.cnt_map[number] = 0
        self.del_freq(self.cnt_map[number], number)
        self.cnt_map[number] += 1
        self.add_freq(self.cnt_map[number], number)

    def deleteOne(self, number: int) -> None:
        if number not in self.cnt_map: self.cnt_map[number] = 0
        self.del_freq(self.cnt_map[number], number)
        if self.cnt_map[number] > 0:
            self.cnt_map[number] -= 1
            self.add_freq(self.cnt_map[number], number)

    def hasFrequency(self, frequency: int) -> bool:
        return frequency in self.freq_map`,
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
