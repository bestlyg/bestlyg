import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2670. 找出不同元素数目差数组',
    url: 'https://leetcode.cn/problems/minimum-seconds-to-equalize-a-circular-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回将数组 nums 中所有元素变成相等元素所需要的 最少 秒数。`,
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
            time: 300,
            memory: 48.3,
            desc: '记录下标，判断下标之间的最大距离',
            code: `class Solution:
    def distinctDifferenceArray(self, nums: List[int]) -> List[int]:
        rdict = defaultdict(int)
        for num in nums: rdict[num] += 1
        cur = len(rdict)
        res = []
        ldict = defaultdict(int)
        for num in nums:
            rdict[num] -= 1
            if rdict[num] == 0: cur -= 1
            ldict[num] += 1
            if ldict[num] == 1: cur -= 1
            res.append(-cur)
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
