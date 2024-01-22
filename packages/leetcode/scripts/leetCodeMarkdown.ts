import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '670. 最大交换',
    url: 'https://leetcode.cn/problems/split-array-largest-sum',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定一个非负整数数组 nums 和一个整数 k ，你需要将这个数组分成 k 个非空的连续子数组。设计一个算法使得这 k 个子数组各自和的最大值最小。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
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
            time: 42,
            memory: 16.49,
            desc: '贪心',
            code: `class Solution:
    def maximumSwap(self, num: int) -> int:
        arr = [[] for _ in range(10)]
        lnum = list(int(c) for c in str(num))
        for i in range(len(lnum)): arr[lnum[i]].append(i)
        swap = False
        for i in range(len(lnum)):
            for num in range(9, -1, -1):
                if lnum[i] >= num: break
                while arr[num] and arr[num][-1] < i: arr[num].pop()
                if arr[num]:
                    lnum[i], lnum[arr[num][-1]] = lnum[arr[num][-1]], lnum[i]
                    swap = True
            if swap: break
        return reduce(lambda sum, num: sum * 10 + num, lnum, 0)`,
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
        //     time: 0,
        //     memory: 2.11,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
