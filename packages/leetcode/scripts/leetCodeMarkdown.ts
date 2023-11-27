import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '907. 子数组的最小值之和',
    url: 'https://leetcode.cn/problems/count-unique-characters-of-all-substrings-of-a-given-string/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵二叉树，每个节点的值为 1 到 9 。我们称二叉树中的一条路径是 「伪回文」的，当它满足：路径经过的所有节点值的排列中，存在一个回文序列。请你返回从根到叶子节点的所有路径中 伪回文 路径的数目。`,
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
            time: 140,
            memory: 20.25,
            desc: '单调栈，找出当前点为最小值时的区间',
            code: `class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        n = len(arr)
        prev = [-1] * n
        next = [n] * n
        s = []
        ans = 0
        for i in range(n):
            while s and arr[s[-1]] >= arr[i]:
                next[s[-1]] = i
                s.pop()
            if s: prev[i] = s[-1]
            s.append(i)
        return sum((next[i] - i) * (i - prev[i]) * arr[i] for i in range(n)) % (10** 9 + 7)`,
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
