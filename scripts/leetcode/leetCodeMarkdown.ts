import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '998. 最大二叉树 II',
  url: 'https://leetcode.cn/problems/maximum-binary-tree-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.二叉树],
  desc: `返回 Construct(b) 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 12.9,
      desc: '每次查看右子树',
      code: `class Solution {
public:
    TreeNode* insertIntoMaxTree(TreeNode* root, int val) {
        TreeNode *node = root, *pre = nullptr;
        while (node && node->val > val) {
            pre  = node;
            node = node->right;
        }
        if (!pre) return new TreeNode(val, root, nullptr);
        pre->right = new TreeNode(val, node, nullptr);
        return root;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
