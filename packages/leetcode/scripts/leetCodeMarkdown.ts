import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2331. 计算布尔二叉树的值',
  url: 'https://leetcode.cn/problems/evaluate-boolean-binary-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回根节点 root 的布尔运算值。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 14.6,
      desc: 'dfs',
      code: `class Solution {
public:
    bool dfs(TreeNode *node) {
        if (node->val == 0) return false;
        if (node->val == 1) return true;
        if (node->left && node->val == 2) return dfs(node->left) || dfs(node->right);
        if (node->left && node->val == 3) return dfs(node->left) && dfs(node->right);
        return false;
    }
    bool evaluateTree(TreeNode* root) {
        return dfs(root); 
    }
};`,
    },
    {
      script: Script.PY3,
      time: 60,
      memory: 15.8,
      desc: '同上',
      code: `class Solution:
    def dfs(self, node: Optional[TreeNode]) -> bool:
        if node.val == 0: return False
        if node.val == 1: return True
        if node.left and node.val == 2: return self.dfs(node.left) or self.dfs(node.right)
        if node.left and node.val == 3: return self.dfs(node.left) and self.dfs(node.right)
        return False
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        return self.dfs(root)`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.4,
      desc: '同上',
      code: `use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn evaluate_tree(node: Option<Rc<RefCell<TreeNode>>>) -> bool {
        let node = node.unwrap();
        let node = node.as_ref().borrow();
        if node.val == 0 {
            return false;
        }
        if node.val == 1 {
            return true;
        }
        if node.left.is_some() && node.val == 2 {
            return Solution::evaluate_tree(node.left.clone()) || Solution::evaluate_tree(node.right.clone());
        }
        if node.left.is_some() && node.val == 3 {
            return Solution::evaluate_tree(node.left.clone()) && Solution::evaluate_tree(node.right.clone());
        }
        return false;
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
