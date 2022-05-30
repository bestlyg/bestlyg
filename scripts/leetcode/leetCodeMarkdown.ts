import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1022. 从根到叶的二进制数之和',
  url: 'https://leetcode.cn/problems/find-closest-lcci/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.字符串],
  desc: `有个内含单词的超大文本文件，给定任意两个不同的单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。`,
  solutions: [
    {
      script: Script.TS,
      time: 4,
      memory: 16.1,
      desc: 'dfs',
      code: `class Solution {
   public:
    int sumRootToLeaf(TreeNode* root) {
        int ans = 0;
        dfs(root, ans, 0);
        return ans;
    }
    void dfs(TreeNode* node, int& ans, int val) {
        val = val << 1 | node->val;
        if (node->left == nullptr && node->right == nullptr) {
            ans += val;
            return;
        }
        if (node->left) dfs(node->left, ans, val);
        if (node->right) dfs(node->right, ans, val);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
