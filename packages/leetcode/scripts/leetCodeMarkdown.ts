import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '82. 删除排序链表中的重复元素 II',
    url: 'https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii',
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
            time: 44,
            memory: 16.9,
            desc: '遍历',
            code: `class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        p = tmp_head = ListNode(0, head)
        while p.next:
            next = p.next
            val = next.val
            while next and next.val == val: next = next.next
            if p.next.next == next: p = p.next
            else: p.next = next
        return tmp_head.next`,
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
        {
            script: Script.RUST,
            time: 0,
            memory: 2.11,
            desc: '同上',
            code: `impl Solution {
    pub fn delete_duplicates(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut tmp_head = Box::new(ListNode::new(0));
        tmp_head.next = head;
        let mut p = &tmp_head;
        let mut map = [0; 300];
        while let Some(ref next) = p.next {
            map[(next.val + 100) as usize] += 1;
            p = next;
        }
        let mut p = &mut tmp_head;
        while let Some(next) = p.next.take() {
            if map[(next.val + 100) as usize] > 1 {
                p.next = next.next;
            } else {
                p.next = Some(next);
                p = p.next.as_mut().unwrap();
            }
        }
        tmp_head.next.take()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
