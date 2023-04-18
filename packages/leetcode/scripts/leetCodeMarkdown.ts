import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1026. 节点与其祖先之间的最大差值',
  url: 'https://leetcode.cn/problems/maximum-difference-between-node-and-ancestor/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给定二叉树的根节点 root，找出存在于 不同 节点 A 和 B 之间的最大值 V，其中 V = |A.val - B.val|，且 A 是 B 的祖先。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory:14.4,
      desc: 'dfs',
      code: `class Solution {
public:
    int maxAncestorDiff(TreeNode* root) {
        function<vector<int>(TreeNode*)> dfs = [&](TreeNode *node) -> vector<int> {
            vector<int> res{ node->val, node->val, 0};
            if (node->left) {
                auto v = dfs(node->left);
                res[0] = min(res[0], v[0]);
                res[1] = max(res[1], v[1]);
                res[2] = max(res[2], max(v[2], max(abs(res[0] - node->val), abs(res[1] - node->val))));
            }
            if (node->right) {
                auto v = dfs(node->right);
                res[0] = min(res[0], v[0]);
                res[1] = max(res[1], v[1]);
                res[2] = max(res[2], max(v[2], max(abs(res[0] - node->val), abs(res[1] - node->val))));
            }
            return res;
        };
        return dfs(root)[2];
    }
};`,
    },
    {
      script: Script.PY3,
      time: 40,
      memory: 21.8,
      desc: '同上',
      code: `class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        def dfs(node: TreeNode) -> List[int]:
            res = [node.val, node.val, 0]
            if node.left != None:
                v = dfs(node.left)
                res[0] = min(res[0], v[0])
                res[1] = max(res[1], v[1])
                res[2] = max(res[2], max(
                    v[2], max(abs(res[0] - node.val), abs(res[1] - node.val))))
            if node.right != None:
                v = dfs(node.right)
                res[0] = min(res[0], v[0])
                res[1] = max(res[1], v[1])
                res[2] = max(res[2], max(
                    v[2], max(abs(res[0] - node.val), abs(res[1] - node.val))))
            return res
        return dfs(root)[2]`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 3.2,
      desc: '同上',
      code: `use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn max_ancestor_diff(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        use std::cmp::{max, min};
        let root = root.unwrap();
        fn dfs(node: &Rc<RefCell<TreeNode>>) -> Vec<i32> {
            let node = node.as_ref().borrow();
            let mut res = vec![node.val, node.val, 0];
            if node.left.is_some() {
                let v = dfs(&node.left.as_ref().unwrap());
                res[0] = min(res[0], v[0]);
                res[1] = max(res[1], v[1]);
                res[2] = max(
                    res[2],
                    max(
                        v[2],
                        max(i32::abs(res[0] - node.val), i32::abs(res[1] - node.val)),
                    ),
                );
            }
            if node.right.is_some() {
                let v = dfs(&node.right.as_ref().unwrap());
                res[0] = min(res[0], v[0]);
                res[1] = max(res[1], v[1]);
                res[2] = max(
                    res[2],
                    max(
                        v[2],
                        max(i32::abs(res[0] - node.val), i32::abs(res[1] - node.val)),
                    ),
                );
            }
            res
        }
        dfs(&root)[2]
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
