import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '669. 修剪二叉搜索树',
  url: 'https://leetcode.cn/problems/trim-a-binary-search-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.深度优先搜索, Tag.二叉搜索树, Tag.二叉树],
  desc: `通过修剪二叉搜索树，使得所有节点的值在[low, high]中。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 16.7,
      desc: 'dfs',
      code: `class Solution {
public:
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        if (!root) return nullptr;
        root->left = trimBST(root->left, low, high);
        root->right = trimBST(root->right, low, high);
        if (root->val < low) root = root->right;
        else if (root->val > high) root = root->left;
        return root;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
