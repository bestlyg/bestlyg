import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2866. 美丽塔 II',
    url: 'https://leetcode.cn/problems/beautiful-towers-ii/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回满足 美丽塔 要求的方案中，高度和的最大值 。`,
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
            time: 316,
            memory: 42.55,
            desc: '字符串拼接',
            code: `class Solution:
    def maximumSumOfHeights(self, maxHeights: List[int]) -> int:
        n = len(maxHeights)
        prev = [-1] * n
        next = [n] * n
        s = []
        for i in range(n):
            while s and maxHeights[s[-1]] >= maxHeights[i]: s.pop()
            if s: prev[i] = s[-1]
            s.append(i)
        s.clear()
        for i in range(n):
            while s and maxHeights[s[-1]] > maxHeights[i]: next[s.pop()] = i
            s.append(i)
        lsums = [0] * n
        rsums = [0] * n
        for i in range(n):
            lsums[i] += (i - prev[i]) * maxHeights[i]
            if prev[i] != -1: lsums[i] += lsums[prev[i]]
        for i in range(n - 1, -1, -1):
            rsums[i] += (next[i] - i) * maxHeights[i]
            if next[i] != n: rsums[i] += rsums[next[i]]
        return max(lsums[i] + rsums[i] - maxHeights[i] for i in range(n))`,
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
