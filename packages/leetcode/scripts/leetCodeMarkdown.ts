import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1466. 重新规划路线',
    url: 'https://leetcode.cn/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你帮助重新规划路线方向，使每个城市都可以访问城市 0 。返回需要变更方向的最小路线数。`,
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
            date: new Date('2023-12-7').getTime(),
            script: Script.PY,
            time: 272,
            memory: 36.8,
            desc: '从0点开始向外bfs',
            code: `class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        froms = [[] for _ in range(n)]
        tos = [[] for _ in range(n)]
        for a, b in connections:
            froms[a].append(b)
            tos[b].append(a)
        q = deque()
        q.append((0, 0, -1))
        ans = 0
        while q:
            cur, f, p = q.popleft()
            ans += len(froms[cur]) - f
            for next in froms[cur]:
                if next != p: q.append((next, 0, cur))
            for next in tos[cur]:
                if next != p: q.append((next, 1, cur))
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
