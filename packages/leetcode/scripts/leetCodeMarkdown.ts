import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2477. 到达首都的最少油耗',
    url: 'https://leetcode.cn/problems/binary-search-tree-to-greater-sum-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定一个二叉搜索树 root (BST)，请将它的每个节点的值替换成树中大于或者等于该节点值的所有节点值之和。`,
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
            time: 352,
            memory: 52.7,
            desc: '贪心，每次批量运送',
            code: `class Solution:
    def minimumFuelCost(self, roads: List[List[int]], seats: int) -> int:
        n = len(roads) + 1
        counts = [1] * n
        nodes = [[] for _ in range(n)]
        for n1, n2 in roads:
            nodes[n1].append(n2)
            nodes[n2].append(n1)
        q = deque()
        for i in range(1, n):
            if len(nodes[i]) == 1:
                q.append(i)
        ans = 0
        while q:
            idx = q.popleft()
            if len(nodes[idx]) == 1:
                ans += ceil(counts[idx] / seats)
                next_idx = nodes[idx][0]
                nodes[next_idx].remove(idx)
                counts[next_idx] += counts[idx]
                if next_idx != 0 and len(nodes[next_idx]) == 1:
                    q.append(next_idx)
        return ans`,
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
