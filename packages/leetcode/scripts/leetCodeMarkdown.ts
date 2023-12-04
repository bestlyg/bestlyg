import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1038. 从二叉搜索树到更大和树',
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
            time: 32,
            memory: 16.11,
            desc: '利用bst的特性，dfs。',
            code: `class Solution:
    def bstToGst(self, root: TreeNode) -> TreeNode:
        sums = 0
        def dfs(node: Optional[TreeNode]):
            nonlocal sums
            if not node: return
            dfs(node.right)
            sums += node.val
            node.val = sums
            dfs(node.left)
        dfs(roo)
        return root`,
        },
        {
            script: Script.CPP,
            time: 0,
            memory: 8.3,
            desc: '同上',
            code: `class Solution {
public:
    TreeNode* bstToGst(TreeNode* root) {
        int sums = 0;
        function<void(TreeNode*)> dfs = [&](TreeNode *node) {
            if (!node) return;
            dfs(node->right);
            sums += node->val;
            node->val = sums;
            dfs(node->left);
        };
        dfs(root);
        return root;
    }
};`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.17,
            desc: '同上',
            code: `use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn bst_to_gst(mut root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        let mut sums = 0;
        fn dfs(node: &mut Option<Rc<RefCell<TreeNode>>>, sums: &mut i32) {
            if let Some(node) = node {
                let mut node_ref = node.as_ref().borrow_mut();
                dfs(&mut node_ref.right, sums);
                *sums += node_ref.val;
                node_ref.val = *sums;
                dfs(&mut node_ref.left, sums);
            }
        }
        dfs(&mut root, &mut sums);
        root
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
