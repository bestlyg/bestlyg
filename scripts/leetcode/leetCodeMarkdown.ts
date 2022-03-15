import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '606. 根据二叉树创建字符串',
  url: 'https://leetcode-cn.com/problems/construct-string-from-binary-tree/',
  difficulty: Difficulty.简单,
  tag: [Tag.树, Tag.深度优先搜索, Tag.字符串, Tag.二叉树],
  desc: `给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 64.2,
      desc: '遍历后组装',
      code: `class Solution {
   public:
    string tree2str(TreeNode* root) {
        if (!root) return "";
        string l = "(" + tree2str(root->left) + ")",
               r = "(" + tree2str(root->right) + ")";
        return to_string(root->val) + (l == "()" && r == "()"   ? ""
                                       : l != "()" && r == "()" ? l
                                                                : l + r);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
