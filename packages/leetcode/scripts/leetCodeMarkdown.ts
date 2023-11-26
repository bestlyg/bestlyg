import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '828. 统计子串中的唯一字符',
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
            time: 272,
            memory: 20.83,
            desc: '按字符归类所有下标，记录当前字符下标仅出现一次的频率',
            code: `class Solution:
    def uniqueLetterString(self, s: str) -> int:
        n = len(s)
        ans = 0
        clist = [[-1] for _ in range(26)]
        for i in range(n): clist[ord(s[i]) - ord('A')].append(i)
        for arr in clist:
            arr.append(n)
            for j in range(1, len(arr) - 1):
                ans += (arr[j] - arr[j - 1]) * (arr[j + 1] - arr[j])
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
