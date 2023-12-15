import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2415. 反转二叉树的奇数层',
    url: 'https://leetcode.cn/problems/reverse-odd-levels-of-binary-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵 完美 二叉树的根节点 root ，请你反转这棵树中每个 奇数 层的节点值。`,
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
            time: 1776,
            memory: 22.2,
            desc: 'bfs',
            code: `class Solution:
    def reverseOddLevels(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root: return None
        q = [root]
        size = 1
        level = 0
        while q:
            node = q.pop(0)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
            size -= 1
            if size == 0:
                size = len(q)
                level += 1
                if level % 2 != 0:
                    for i in range(len(q) // 2):
                        q[i].val, q[len(q) - 1 - i].val = q[len(q) - 1 - i].val, q[i].val
        return root`,
        },
//         {
//             script: Script.CPP,
//             time: 32,
//             memory: 15.03,
//             desc: '同上',
//             code: `class Solution {
// public:
//     string makeSmallestPalindrome(string s) {
//         for (int i = 0; i < s.size() / 2; i++) {
//             s[i] = s[s.size() - 1 - i] = min(s[i], s[s.size() - 1 - i]);
//         }
//         return s;
//     }
// };`,
//         },
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
