import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2697. 字典序最小回文串',
    url: 'https://leetcode.cn/problems/lexicographically-smallest-palindrome',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回最终的回文字符串。`,
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
            time: 148,
            memory: 16.23,
            desc: '遍历',
            code: `class Solution:
    def makeSmallestPalindrome(self, s: str) -> str:
        arr = list(s)
        for i in range(len(arr) // 2):
            arr[i] = arr[len(arr) - 1 - i]= min(arr[i], arr[len(arr) - 1 - i])
        return ''.join(arr)`,
        },
        {
            script: Script.CPP,
            time: 32,
            memory: 15.03,
            desc: '同上',
            code: `class Solution {
public:
    string makeSmallestPalindrome(string s) {
        for (int i = 0; i < s.size() / 2; i++) {
            s[i] = s[s.size() - 1 - i] = min(s[i], s[s.size() - 1 - i]);
        }
        return s;
    }
};`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 2.35,
            desc: '同上',
            code: `impl Solution {
    pub fn make_smallest_palindrome(s: String) -> String {
        let mut arr = s.chars().map(|c| c as u8).collect::<Vec<u8>>();
        let n = arr.len();
        for i in 0..n / 2 {
            arr[i] = arr[i].min(arr[n - 1 - i]);
            arr[n - 1 - i] = arr[i];
        }
        String::from_utf8(arr).unwrap()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
