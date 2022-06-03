import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '450. 删除二叉搜索树中的节点',
  url: 'https://leetcode.cn/problems/Jf1JuT/',
  difficulty: Difficulty.困难,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.图, Tag.拓扑排序, Tag.数组, Tag.字符串],
  desc: `请你根据该词典还原出此语言中已知的字母顺序，并 按字母递增顺序 排列。若不存在合法字母顺序，返回 "" 。若存在多种可能的合法字母顺序，返回其中 任意一种 顺序即可。`,
  solutions: [
    {
      script: Script.TS,
      time: 24,
      memory: 31.9,
      desc: 'dfs',
      code: `class Solution {
   public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return root;
        if (root->val > key)
            root->left = deleteNode(root->left, key);
        else if (root->val < key)
            root->right = deleteNode(root->right, key);
        else {
            if (root->left == nullptr || root->right == nullptr) {
                TreeNode* child =
                    root->left == nullptr ? root->right : root->left;
                root = child;
            } else {
                TreeNode* tmp = root->right;
                while (tmp->left) tmp = tmp->left;
                root->val = tmp->val;
                root->right = deleteNode(root->right, tmp->val);
            }
        }
        return root;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
