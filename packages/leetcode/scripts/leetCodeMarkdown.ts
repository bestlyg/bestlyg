import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3040. 相同分数的最大操作数目 II',
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
            time: 2313,
            memory: 377.62,
            desc: 'dfs',
            code: `class Solution:
    def maxOperations(self, nums: List[int]) -> int:
        n = len(nums)
        @cache
        def dfs(l: int, r: int, score: int) -> int:
            if r - l + 1 < 2: return 0
            res = 0
            if nums[l] + nums[l + 1] == score:
                res = max(res, 1 + dfs(l + 2, r, score))
            if nums[r] + nums[r - 1] == score:
                res = max(res, 1 + dfs(l, r - 2, score))
            if nums[l] + nums[r] == score:
                res = max(res, 1 + dfs(l + 1, r - 1, score))
            return res
        return 1 + max(
            dfs(2, n - 1, nums[0] + nums[1]),
            dfs(0, n - 1 - 2, nums[n - 1] + nums[n - 2]),
            dfs(1, n - 1 - 1, nums[0] + nums[n - 1])
        )`,
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
