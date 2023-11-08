import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2609. 最长平衡子字符串',
    url: 'https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。`,
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
        //     script: Script.CPP,
        //     time: 716,
        //     memory: 172.36,
        //     desc: '同上',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 44,
            memory: 15.48,
            desc: '一次遍历',
            code: `class Solution:
    def findTheLongestBalancedSubstring(self, s: str) -> int:
        n = len(s)
        i = ans = 0
        while i < n and s[i] == '1': i += 1
        while i < n:
            cur = i
            while i < n and s[i] == '0': i += 1
            cnt0 = i - cur
            while i < n and s[i] == '1': i += 1
            cnt1 = i - cur - cnt0
            ans = max(ans, min(cnt0, cnt1) * 2)
        return ans`,
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
