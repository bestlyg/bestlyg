import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2085. 统计出现过一次的公共字符串',
    url: 'https://leetcode.cn/problems/count-common-words-with-one-occurrence/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个字符串数组 words1 和 words2 ，请你返回在两个字符串数组中 都恰好出现一次 的字符串的数目。`,
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
            time: 52,
            memory: 17.23,
            desc: '计数',
            code: `class Solution:
    def countWords(self, words1: List[str], words2: List[str]) -> int:
        c1 = Counter(words1)
        c2 = Counter(words2)
        return sum(v == 1 and c2[k] == 1 for k, v in c1.items())`,
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
