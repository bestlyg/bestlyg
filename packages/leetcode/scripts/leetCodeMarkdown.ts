import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '617. 合并二叉树',
    url: 'https://leetcode.cn/problems/merge-k-sorted-lists/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 36,
            memory: 30.85,
            desc: '递归合并',
            code: `class Solution {
public:
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if (!root1 && !root2) return nullptr;
        else if (root1 && !root2) return root1;
        else if (!root1 && root2) return root2;
        else {
            root1->val += root2->val;
            root1->left = mergeTrees(root1->left, root2->left);
            root1->right = mergeTrees(root1->right, root2->right);
            return root1;
        }
    }
};`,
        },
        {
            script: Script.PY,
            time: 64,
            memory: 16.15,
            desc: '同上',
            code: `class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1 and not root2:
            return None
        elif root1 and not root2:
            return root1
        elif not root1 and root2:
            return root2
        else:
            root1.val += root2.val
            root1.left = self.mergeTrees(root1.left, root2.left)
            root1.right = self.mergeTrees(root1.right, root2.right)
            return root1`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.3,
            desc: '同上',
            code: `use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn merge_trees(
        root1: Option<Rc<RefCell<TreeNode>>>,
        root2: Option<Rc<RefCell<TreeNode>>>,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        match root1 {
            None => root2,
            Some(mut root1) => match root2 {
                None => Some(root1),
                Some(root2) => {
                    {
                        let mut root1_ref = root1.as_ref().borrow_mut();
                        let mut root2_ref = root2.as_ref().borrow_mut();
                        root1_ref.val += root2_ref.val;
                        {
                            let child1 = root1_ref.left.take();
                            let child2 = root2_ref.left.take();
                            root1_ref.left = Self::merge_trees(child1, child2);
                        }
                        {
                            let child1 = root1_ref.right.take();
                            let child2 = root2_ref.right.take();
                            root1_ref.right = Self::merge_trees(child1, child2);
                        }
                    }
                    Some(root1)
                }
            },
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
