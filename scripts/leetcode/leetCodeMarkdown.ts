import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '965. 单值二叉树',
  url: 'https://leetcode.cn/problems/cut-off-trees-for-golf-event/',
  difficulty: Difficulty.困难,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵, Tag.堆_优先队列],
  desc: `你将从 (0, 0) 点开始工作，返回你砍完所有树需要走的最小步数。 如果你无法砍完所有的树，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 9.5,
      desc: 'dfs',
      code: `class Solution {
   public:
    bool isUnivalTree(TreeNode* root) { return _isUnivalTree(root, root->val); }
    bool _isUnivalTree(TreeNode* node, int val) {
        if (node == nullptr) return true;
        return node->val == val && _isUnivalTree(node->left, val) &&
               _isUnivalTree(node->right, val);
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 9.6,
      desc: 'dfs',
      code: `class Solution {
   public:
    int val = 0;
    bool isUnivalTree(TreeNode* root) {
        if (!root) return true;
        if (val == 0) val = root->val;
        return root->val == val && isUnivalTree(root->left) &&
               isUnivalTree(root->right);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
