import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1535. 找出数组游戏的赢家',
    url: 'https://leetcode.cn/problems/find-the-winner-of-an-array-game',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回赢得比赛的整数。`,
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
            time: 80,
            memory: 27.17,
            desc: '遍历时记录当前最大值和最大次数',
            code: `class Solution:
    def getWinner(self, arr: List[int], k: int) -> int:
        n = len(arr)
        nmax = max(arr)
        if k >= n: return nmax
        curIndex = 0
        curCount = 0
        while curCount < k:
            # print(f'===> curIndex = {curIndex}, curCount = {curCount}, arr = {arr}')
            if arr[curIndex] == nmax: return nmax
            nextIndex = (curIndex + 1) % n
            if arr[curIndex] > arr[nextIndex]:
                arr[curIndex], arr[nextIndex] = arr[nextIndex], arr[curIndex]
            else:
                curCount = 0
            curCount += 1
            curIndex = nextIndex
            # print(f'curIndex = {curIndex}, curCount = {curCount}, arr = {arr}')
        return arr[curIndex]`,
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
