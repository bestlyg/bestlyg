import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '705. 设计哈希集合',
    url: 'https://leetcode.cn/problems/find-champion-ii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `如果这场比赛存在 唯一 一个冠军，则返回将会成为冠军的队伍。否则，返回 -1 。`,
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
            time: 217,
            memory: 43.05,
            desc: '利用bitmap存储',
            code: `class BitMap:
    def __init__(self, n: int):
        self.size = 64
        self.buckets = [0] * n
    def add(self, key: int):
        self.set(key // self.size, key % self.size, True)
    def remove(self, key: int):
        self.set(key // self.size, key % self.size, False)
    def contains(self, key: int):
        return self.get(key // self.size, key % self.size)
    def set(self, bucket: int, loc: int, val: bool):
        if val:
            self.buckets[bucket] |= 1 << loc
        else:
            self.buckets[bucket] = self.buckets[bucket] & ~(1 << loc)
    def get(self, bucket: int, loc: int):
        return bool((self.buckets[bucket] >> loc) & 1)
    
class MyHashSet:
    def __init__(self):
        self.bm = BitMap(10 ** 6 + 1)
    def add(self, key: int) -> None:
        self.bm.add(key)
    def remove(self, key: int) -> None:
        self.bm.remove(key)
    def contains(self, key: int) -> bool:
        return self.bm.contains(key)`,
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
