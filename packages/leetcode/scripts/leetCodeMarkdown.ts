import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2707. 字符串中的额外字符',
    url: 'https://leetcode.cn/problems/extra-characters-in-a-string',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的字符串 s 和一个单词字典 dictionary 。你需要将 s 分割成若干个 互不重叠 的子字符串，每个子字符串都在 dictionary 中出现过。s 中可能会有一些 额外的字符 不在任何子字符串中。请你采取最优策略分割 s ，使剩下的字符 最少 。`,
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
            time: 156,
            memory: 16.97,
            desc: 'dp[i]表示以i为结尾的字符串省略的最多字符',
            code: `class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        cache = set(dictionary)
        n = len(s)
        dp = [inf] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            dp[i] = dp[i - 1] + 1
            for j in range(i):
                if s[j: i] in cache:
                    dp[i] = min(dp[i], dp[j])
        return dp[n]`,
        },

        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
//         {
//             script: Script.RUST,
//             time: 8,
//             memory: 2.83,
//             desc: '同上',
//             code: `fn gcd(a: i32, b: i32) -> i32 {
//     if a < b {
//         gcd(b, a)
//     } else if b == 0 {
//         a
//     } else {
//         gcd(b, a % b)
//     }
// }
// impl Solution {
//     pub fn insert_greatest_common_divisors(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
//         let mut head = head.unwrap();
//         let mut p = &mut head;
//         while let Some(mut next) = p.next.take() {
//             let mut new_next = Box::new(ListNode::new(gcd(p.val, next.val)));
//             new_next.next = Some(next);
//             p.next = Some(new_next);
//             p = p.next.as_mut().unwrap().next.as_mut().unwrap();
//         }
//         Some(head)
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
