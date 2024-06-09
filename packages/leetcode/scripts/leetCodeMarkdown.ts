import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '312. 戳气球',
    url: 'https://leetcode.cn/problems/maximum-number-of-operations-with-the-same-score-ii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在确保 所有操作分数相同 的前提下，请你求出 最多 能进行多少次操作。请你返回按照上述要求 最多 可以进行的操作次数。`,
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

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 3651,
            memory: 33,
            desc: 'dfs, 从下往上，刚开始没有气球，逐渐增加气球',
            code: `class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        nums = [1] + nums + [1]
        @cache
        def dfs(l: int, r: int) -> int:
            return max((nums[m] * nums[l] * nums[r] + dfs(l, m) + dfs(m, r) for m in range(l + 1, r)), default = 0)
        return dfs(0, len(nums) - 1)`,
        },
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
