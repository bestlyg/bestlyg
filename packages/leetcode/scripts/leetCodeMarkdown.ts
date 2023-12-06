import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2646. 最小化旅行的价格总和',
    url: 'https://leetcode.cn/problems/minimize-the-total-price-of-the-trips',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回执行所有旅行的最小价格总和。`,
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
        {
            script: Script.PY,
            time: 888,
            memory: 257.3,
            desc: '提前统计每个点会被经过的次数，然后dp判断每个点打折和不打折的情况',
            code: `class Solution:
        def minimumTotalPrice(self, n: int, edges: List[List[int]], price: List[int], trips: List[List[int]]) -> int:
            nodes = [[] for _ in range(n)]
            for n1, n2 in edges:
                nodes[n1].append(n2)
                nodes[n2].append(n1)
            cnts = [0] * n
            def dfs(start: int, end: int, used: int) -> bool:
                if start == end:
                    cnts[end] += 1
                    return True
                check = False
                for next in nodes[start]:
                    if (used & (1 << next)) == 0 and dfs(next, end, used | (1 << next)):
                        cnts[start] += 1
                        check = True
                return check
            for start, end in trips: dfs(start, end, 1 << start)
            sums = sum(c * price[i] for i, c in enumerate(cnts))
            @cache
            def try_trip(idx: int, used: int, can: bool) -> int:
                res1 = 0
                if can: 
                    res1 += int(cnts[idx] * price[idx] / 2)
                    for next in nodes[idx]:
                        if (used & (1 << next)) == 0:
                            res1 += try_trip(next, used | (1 << next), not can)
                res2 = 0
                for next in nodes[idx]:
                    if (used & (1 << next)) == 0:
                        res2 += try_trip(next, used | (1 << next), True)
                return max(res1, res2)
            return min(sums - try_trip(i, 1 << i, True) for i in range(n))`,
        },
        //         {
        //             script: Script.CPP,
        //             time: 0,
        //             memory: 8.3,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     TreeNode* bstToGst(TreeNode* root) {
        //         int sums = 0;
        //         function<void(TreeNode*)> dfs = [&](TreeNode *node) {
        //             if (!node) return;
        //             dfs(node->right);
        //             sums += node->val;
        //             node->val = sums;
        //             dfs(node->left);
        //         };
        //         dfs(root);
        //         return root;
        //     }
        // };`,
        //         },
        //         {
        //             script: Script.RUST,
        //             time: 0,
        //             memory: 2.17,
        //             desc: '同上',
        //             code: `use std::cell::RefCell;
        // use std::rc::Rc;
        // impl Solution {
        //     pub fn bst_to_gst(mut root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        //         let mut sums = 0;
        //         fn dfs(node: &mut Option<Rc<RefCell<TreeNode>>>, sums: &mut i32) {
        //             if let Some(node) = node {
        //                 let mut node_ref = node.as_ref().borrow_mut();
        //                 dfs(&mut node_ref.right, sums);
        //                 *sums += node_ref.val;
        //                 node_ref.val = *sums;
        //                 dfs(&mut node_ref.left, sums);
        //             }
        //         }
        //         dfs(&mut root, &mut sums);
        //         root
        //     }
        // }`,
        //         },
    ],
};

export default leetCodeMarkdown;
