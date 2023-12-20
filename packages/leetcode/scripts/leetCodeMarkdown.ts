import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2828. 判别首字母缩略词',
    url: 'https://leetcode.cn/problems/check-if-a-string-is-an-acronym-of-words',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个字符串数组 words 和一个字符串 s ，请你判断 s 是不是 words 的 首字母缩略词 。如果可以按顺序串联 words 中每个字符串的第一个字符形成字符串 s ，则认为 s 是 words 的首字母缩略词。`,
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
            time: 56,
            memory: 17.75,
            desc: '字符串拼接',
            code: `class Solution:
    def isAcronym(self, words: List[str], s: str) -> bool:
        return ''.join(w[0] for w in words) == s`,
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
