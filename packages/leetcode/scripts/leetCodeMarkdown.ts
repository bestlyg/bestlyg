import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2182. 构造限制重复的字符串',
    url: 'https://leetcode.cn/problems/construct-string-with-repeat-limit/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个字符串 s 和一个整数 repeatLimit ，用 s 中的字符构造一个新字符串 repeatLimitedString ，使任何字母 连续 出现的次数都不超过 repeatLimit 次。你不必使用 s 中的全部字符。返回 字典序最大的 repeatLimitedString 。`,
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
            time: 212,
            memory: 18.19,
            desc: '计数，贪心',
            code: `class Solution:
    def repeatLimitedString(self, s: str, repeatLimit: int) -> str:
        counter = Counter(s)
        arr = list(counter.items())
        arr.sort()
        ans = ''
        while arr:
            ch, cnt = arr.pop()
            while cnt:
                cur_cnt = min(cnt, repeatLimit)
                cnt -= cur_cnt
                ans += ch * cur_cnt
                if cnt:
                    if arr:
                        ans += arr[-1][0]
                        arr[-1] = (arr[-1][0], arr[-1][1] - 1)
                        if arr[-1][1] == 0:
                            arr.pop()
                    else:
                        break
        return ans`,
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
