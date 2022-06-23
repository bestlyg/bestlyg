import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '513. 找树左下角的值',
  url: 'https://leetcode.cn/problems/substring-with-concatenation-of-all-words/',
  difficulty: Difficulty.困难,
  tag: [Tag.哈希表, Tag.字符串, Tag.滑动窗口],
  desc: `给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 21.1,
      desc: '层序遍历',
      code: `class Solution {
   public:
    int findBottomLeftValue(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        int ans = root->val, size = 1;
        while (q.size()) {
            TreeNode* node = q.front();
            q.pop();
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
            if (--size == 0) {
                size = q.size();
                if (q.size()) ans = q.front()->val;
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
