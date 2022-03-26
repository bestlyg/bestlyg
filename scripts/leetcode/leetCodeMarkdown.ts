import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1022. 从根到叶的二进制数之和',
  url: 'https://leetcode-cn.com/problems/available-captures-for-rook/',
  difficulty: Difficulty.简单,
  tag: [Tag.树, Tag.深度优先搜索, Tag.二叉树],
  desc: `给出一棵二叉树，其上每个结点的值都是 0 或 1 。每一条从根到叶的路径都代表一个从最高有效位开始的二进制数。返回这些数字之和。`,
  solutions: [
    {
      script: Script.TS,
      time: 0,
      memory: 16.3,
      desc: 'dfs',
      code: `class Solution {
   public:
    int sumRootToLeaf(TreeNode *root) {
        int ans = 0;
        dfs(root, ans, 0);
        return ans;
    }
    void dfs(TreeNode *node, int &ans, int num) {
        if (!node) return;
        num = num << 1 | node->val;
        if (!node->left && !node->right) {
            ans += num;
            return;
        }
        dfs(node->left, ans, num);
        dfs(node->right, ans, num);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
