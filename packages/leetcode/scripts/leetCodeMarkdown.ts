import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '410. 分割数组的最大值',
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
        {
            date: new Date('2020.07.25').getTime(),
            script: Script.TS,
            time: 188,
            memory: 39.68,
            desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
            code: `function splitArray(nums: number[], m: number): number {
    const n = nums.length;
    const dp = new Array(n + 1)
        .fill(0)
        .map((_) => new Array(m + 1).fill(Infinity));
    dp[0][0] = 0;
    const sub = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) sub[i + 1] = sub[i] + nums[i];
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, m); j++) {
        for (let k = 0; k < i; k++) {
            dp[i][j] = Math.min(dp[i][j], Math.max(dp[k][j - 1], sub[i] - sub[k]));
        }
        }
    }
    return dp[n][m];
}`,
        },
        {
            script: Script.PY,
            time: 7699,
            memory: 16.83,
            desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
            code: `class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        n = len(nums)
        dp = [[inf] * (n + 1) for _ in range(k + 1)]
        dp[1][0] = 0
        for i in range(1, n + 1): dp[1][i] = dp[1][i - 1] + nums[i - 1]
        for k in range(2, k + 1):
            for i in range(k, n + 1):
                num = 0
                for j in range(i, k - 1, -1):
                    num += nums[j - 1]
                    dp[k][i] = min(dp[k][i], max(dp[k - 1][j - 1], num))
        return dp[k][n]`,
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
