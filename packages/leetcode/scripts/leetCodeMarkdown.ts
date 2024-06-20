import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2748. 美丽下标对的数目',
    url: 'https://leetcode.cn/problems/number-of-beautiful-pairs',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回 nums 中 美丽下标对 的总数目`,
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
            time: 385,
            memory: 16.5,
            desc: '遍历',
            code: `class Solution:
    def countBeautifulPairs(self, nums: List[int]) -> int:
        return sum(
            gcd(int(str(nums[i])[-1]), int(str(nums[j])[0])) == 1
            for i in range(len(nums))
            for j in range(i)
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
