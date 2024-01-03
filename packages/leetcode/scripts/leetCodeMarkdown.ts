import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2487. 从链表中移除节点',
    url: 'https://leetcode.cn/problems/buy-two-chocolates',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回在购买两块巧克力后，最多能剩下多少钱。`,
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
            time: 644,
            memory: 55.98,
            desc: '单调栈记录最大序列，遍历时记录父节点',
            code: `class Solution:
    def removeNodes(self, head: Optional[ListNode]) -> Optional[ListNode]:
        p = tempHead = ListNode(0, head)
        s = []
        map = {}
        while p.next:
            map[p.next] = p 
            while s and s[-1].val < p.next.val:
                node = s.pop()
                parent = map[node]
                parent.next = node.next
                map[node.next] = parent
            s.append(p.next)
            p = p.next
        return tempHead.next`,
        },
        {
            script: Script.PY,
            time: 360,
            memory: 59.6,
            desc: 'dfs',
            code: `class Solution:
    def removeNodes(self, head: Optional[ListNode]) -> Optional[ListNode]:
        self.max = 0
        def dfs(node: Optional[ListNode]) -> Optional[ListNode]:
            if not node: return node
            node.next = dfs(node.next)
            if self.max > node.val: return node.next
            self.max = node.val
            return node
        return dfs(head)`,
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
            time: 72,
            memory: 11.33,
            desc: '同上',
            code: `impl Solution {
    pub fn remove_nodes(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut max = 0;
        fn dfs(node: Option<Box<ListNode>>, max: &mut i32) -> Option<Box<ListNode>> {
            match node {
                None => None,
                Some(mut node) => {
                    node.next = dfs(node.next.take(), max);
                    if *max > node.val {
                        node.next.take()
                    } else {
                        *max = node.val;
                        Some(node)
                    }
                }
            }
        }
        dfs(head, &mut max)
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
