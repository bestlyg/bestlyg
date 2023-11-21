import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2216. 美化数组的最少删除数',
    url: 'https://leetcode.cn/problems/minimum-deletions-to-make-array-beautiful',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回使 nums 变为美丽数组所需删除的 最少 元素数目。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 216,
            memory: 26.28,
            desc: '一次遍历',
            code: `class Solution:
    def minDeletion(self, nums: List[int]) -> int:
        ans = 0
        for i in range(0, len(nums) - 1):
            if (i - ans) % 2 == 0 and nums[i] == nums[i + 1]: ans += 1
        return ans + (len(nums) - ans) % 2`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
