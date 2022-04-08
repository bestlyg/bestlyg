import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '429. N 叉树的层序遍历',
  url: 'https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/submissions/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.广度优先搜索],
  desc: `给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 11.5,
      desc: '层序遍历',
      code: `class Solution {
   public:
    vector<vector<int>> levelOrder(Node *root) {
        vector<vector<int>> ans;
        if (!root) return ans;
        queue<Node *> q;
        q.push(root);
        int size = 1;
        vector<int> cur;
        while (q.size()) {
            Node *node = q.front();
            q.pop();
            cur.push_back(node->val);
            for (auto child : node->children) q.push(child);
            if (--size == 0) {
                size = q.size();
                ans.push_back(cur);
                cur.clear();
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
