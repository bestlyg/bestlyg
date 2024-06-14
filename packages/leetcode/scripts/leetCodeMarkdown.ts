import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2786. 访问数组中的位置使分数最大',
    url: 'https://leetcode.cn/problems/visit-array-positions-to-maximize-score',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回你能得到的 最大 得分之和。`,
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
            time: 264,
            memory: 31.34,
            desc: '遍历时存储前面最大的奇偶值',
            code: `class Solution:
    def maxScore(self, nums: List[int], x: int) -> int:
        prev = [0, 0]
        prev[nums[0] & 1] = nums[0]
        prev[nums[0] & 1 ^ 1] = nums[0] - x
        for num in nums[1:]:
            v = max(prev[num & 1] + num, prev[num & 1 ^ 1] + num - x)
            prev[num & 1] = max(prev[num & 1], v)
        return max(prev)`,
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
