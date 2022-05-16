import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '面试题 04.06. 后继者',
  url: 'https://leetcode-cn.com/problems/minimum-genetic-mutation/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.哈希表, Tag.字符串],
  desc: `给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 22.4,
      desc: '递归',
      code: `class Solution {
   public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        if (root == p) {
            if (p->right == nullptr) return nullptr;
            TreeNode* next = p->right;
            while (next->left) next = next->left;
            return next;
        }
        TreeNode* nextRoot = root->val > p->val ? root->left : root->right;
        TreeNode* next = inorderSuccessor(nextRoot, p);
        if (next == nullptr && nextRoot == root->left) next = root;
        return next;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
