import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1080. 根到叶路径上的不足节点',
  url: 'https://leetcode.cn/problems/insufficient-nodes-in-root-to-leaf-paths/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给你二叉树的根节点 root 和一个整数 limit ，请你同时删除树中所有 不足节点 ，并返回最终二叉树的根节点。`,
  solutions: [
    //         {
    //           script: Script.TS,
    //           time: 76,
    //           memory:45.5,
    //           desc: '利用余数为0判断是否产生分割',
    //           code: `function chunk(arr: any[], size: number): any[][] {
    //     const res: any[][] = [];
    //     const item: any[] = [];
    //     for (let i = 1; i <= arr.length; i++) {
    //         item.push(arr[i - 1]);
    //         if (i % size === 0) res.push([...item]), (item.length = 0);
    //     }
    //     if (item.length) res.push([...item]);
    //     return res;
    // }`,
    //         },
    {
      script: Script.CPP,
      time: 40,
      memory: 32.7,
      desc: 'dfs判断下一层节点是否满足',
      code: `class Solution {
public:
    TreeNode* sufficientSubset(TreeNode* root, int limit) {
        return dfs(root, limit, 0) ? root : nullptr;
    }
    bool dfs(TreeNode *node, int limit, int sum) {
        if (!node) return true;
        sum += node->val;
        auto l = dfs(node->left, limit, sum), r = dfs(node->right, limit, sum);
        if (!node->left && !node->right && sum < limit ||
            !node->left && !r ||
            !node->right && !l ||
            !l && !r) return false;
        if (!l) node->left = nullptr;
        if (!r) node->right = nullptr;
        return true;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 84,
      memory:17.9,
      desc: '同上',
      code: `def dfs(node: Optional[TreeNode], limit: int, sum: int):
    if node == None:
        return True
    sum += node.val
    l, r = dfs(node.left, limit, sum), dfs(node.right, limit, sum)
    if (not node.left and not node.right and sum < limit) or (not node.left and not r) or (not node.right and not l) or (not l and not r):
        return False
    if not l:
        node.left = None
    if not r:
        node.right = None
    return True


class Solution:
    def sufficientSubset(self, root: Optional[TreeNode], limit: int) -> Optional[TreeNode]:
        return root if dfs(root, limit, 0) else None`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2.5,
      desc: '同上',
      code: `use std::cell::RefCell;
use std::rc::Rc;
fn dfs(node: &mut Option<Rc<RefCell<TreeNode>>>, limit: i32, mut sum: i32) -> bool {
    match node {
        None => true,
        Some(ref node) => {
            let mut nodeRef = node.as_ref().borrow_mut();
            sum += nodeRef.val;
            let l = dfs(&mut nodeRef.left, limit, sum);
            let r = dfs(&mut nodeRef.right, limit, sum);
            if nodeRef.left.is_none() && nodeRef.right.is_none() && sum < limit
                || nodeRef.left.is_none() && !r
                || nodeRef.right.is_none() && !l
                || !l && !r
            {
                false
            } else {
                if !l {
                    nodeRef.left = None;
                }
                if !r {
                    nodeRef.right = None;
                }
                true
            }
        }
    }
}
impl Solution {
    pub fn sufficient_subset(
        mut root: Option<Rc<RefCell<TreeNode>>>,
        limit: i32,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        if dfs(&mut root, limit, 0) {
            root
        } else {
            None
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
