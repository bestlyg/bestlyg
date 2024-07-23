import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3098. 求出所有子序列的能量和',
    url: 'https://leetcode.cn/problems/find-the-sum-of-subsequence-powers',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回 nums 中长度 等于 k 的 所有 子序列的 能量和 。`,
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
            time: 3583,
            memory: 759.11,
            desc: 'dfs',
            code: `class Solution:
    def sumOfPowers(self, nums: List[int], k: int) -> int:
        n = len(nums)
        nums.sort()
        @cache
        def dfs(idx: int, k: int, prev_idx: int, cur_min: int) -> int:
            if k == 0: return cur_min
            if idx == n: return 0
            next_min = cur_min if prev_idx == -1 else min(cur_min, nums[idx] - nums[prev_idx])
            return dfs(idx + 1, k, prev_idx, cur_min) + dfs(idx + 1, k - 1, idx, next_min)
        return dfs(0, k, -1, inf) % (10 ** 9 + 7)`,
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
