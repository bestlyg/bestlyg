import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1146. 快照数组',
    url: 'https://leetcode.cn/problems/snapshot-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `实现支持下列接口的「快照数组」- SnapshotArray`,
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
            time: 424,
            memory: 42.39,
            desc: '仅存储变更',
            code: `class SnapshotArray:
    def __init__(self, length: int):
        self.next_snap = 0
        self.list = [[(-1, 0)] for _ in range(length)]
    def set(self, index: int, val: int) -> None:
        if self.list[index][-1][0] == self.next_snap:
            self.list[index][-1] = (self.next_snap, val)
        else:
            self.list[index].append((self.next_snap, val))
    def snap(self) -> int:
        snap = self.next_snap
        self.next_snap += 1
        return snap
    def get(self, index: int, snap_id: int) -> int:
        res = bisect_right(self.list[index], (snap_id, 1e10))
        return self.list[index][res - 1][1]`,
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
