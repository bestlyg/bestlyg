import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1671. 得到山形数组的最少删除次数',
    url: 'https://leetcode.cn/problems/minimum-number-of-removals-to-make-mountain-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你整数数组 nums​ ，请你返回将 nums 变成 山形状数组 的​ 最少 删除次数。`,
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
        //     date: new Date('2021.01.29').getTime(),
        //     script: Script.TS,
        //     time: 352,
        //     memory: 46.7,
        //     desc: '二分',
        //     code: ``,
        // },

        {
            script: Script.PY,
            time: 2260,
            memory: 17.11,
            desc: '对两边求最长子序列',
            code: `def getList(nums: List[int]) -> List[int]:
        n = len(nums)
        dp = [1] * n
        for i in range(n):
            for j in range(i):
                if nums[i] > nums[j]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return dp
    
    class Solution:
        def minimumMountainRemovals(self, nums: List[int]) -> int:
            n = len(nums)
            prev = getList(nums)
            next = getList(nums[::-1])[::-1]
            return n - max(prev[i] + next[i] - 1 if prev[i] > 1 and next[i] > 1 else 0 for i in range(n))`,
        },
        // {
        //     script: Script.CPP,
        //     time: 432,
        //     memory: 181.94,
        //     desc: '平衡二叉树',
        //     code: ``,
        // },
        //         {
        //             script: Script.RUST,
        //             time: 8,
        //             memory: 2.35,
        //             desc: '同上',
        //             code: `impl Solution {
        //     pub fn make_smallest_palindrome(s: String) -> String {
        //         let mut arr = s.chars().map(|c| c as u8).collect::<Vec<u8>>();
        //         let n = arr.len();
        //         for i in 0..n / 2 {
        //             arr[i] = arr[i].min(arr[n - 1 - i]);
        //             arr[n - 1 - i] = arr[i];
        //         }
        //         String::from_utf8(arr).unwrap()
        //     }
        // }`,
        //         },
    ],
};

export default leetCodeMarkdown;
