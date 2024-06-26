import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2741. 特别的排列',
    url: 'https://leetcode.cn/problems/special-permutations',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回特别排列的总数目，由于答案可能很大，请将它对 109 + 7 取余 后返回。`,
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
            time: 3193,
            memory: 128.91,
            desc: 'dfs',
            code: `class Solution:
    def specialPerm(self, nums: List[int]) -> int:
        n = len(nums)
        @cache
        def dfs(last: int, mask: int) -> int:
            if mask == (1 << n) - 1: return 1
            return sum(
                dfs(nums[i], mask | (1 << i))
                for i in range(n)
                if mask & (1 << i) == 0 and (last % nums[i] == 0 or nums[i] % last == 0)
            )
        return sum(dfs(nums[i], 1 << i) for i in range(n)) % (10 ** 9 + 7)`,
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
