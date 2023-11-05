import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '318. 最大单词长度乘积',
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
            time: 844,
            memory: 18.57,
            desc: '哈希存储',
            code: `class Solution:
    def maxProduct(self, words: List[str]) -> int:
        m = { word: reduce(lambda n, c: n | 1 << ord(c), word, 0) for word in words}
        return max(len(word1) * len(word2) if m[word1] & m[word2] == 0 else 0 for word1 in words for word2 in words)`,
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
