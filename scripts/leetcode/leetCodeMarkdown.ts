import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '965. 单值二叉树',
  url: 'https://leetcode-cn.com/problems/univalued-binary-tree/',
  difficulty: Difficulty.简单,
  tag: [Tag.树, Tag.深度优先搜索, Tag.广度优先搜索, Tag.二叉树],
  desc: `如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。`,
  solutions: [
    {
      script: Script.TS,
      time: 4,
      memory: 9.6,
      desc: 'dfs',
      code: `class Solution {
   public:
    bool isUnivalTree(TreeNode* root) { return dfs(root, root->val); }
    bool dfs(TreeNode* node, int val) {
        if (!node) return true;
        if (node->val != val) return false;
        return dfs(node->left, val) && dfs(node->right, val);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
