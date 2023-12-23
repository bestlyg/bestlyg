import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1962. 移除石子使总数最小',
    url: 'https://leetcode.cn/problems/remove-stones-to-minimize-the-total/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回执行 k 次操作后，剩下石子的 最小 总数。`,
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
            time: 708,
            memory: 28.59,
            desc: 'heap',
            code: `class Solution:
    def minStoneSum(self, piles: List[int], k: int) -> int:
        q = list(-v for v in piles)
        heapify(q)
        res = sum(piles)
        for _ in range(k):
            v = -heappop(q)
            res -= floor(v / 2)
            heappush(q, -(v - floor(v / 2)))
        return res`,
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
