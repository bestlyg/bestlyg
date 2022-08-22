import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '654. 最大二叉树',
  url: 'https://leetcode.cn/problems/maximum-binary-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.树, Tag.数组, Tag.分治, Tag.二叉树, Tag.单调栈],
  desc: `返回 nums 构建的 最大二叉树 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 64,
      memory: 41.2,
      desc: 'dfs',
      code: `class Solution {
public:
    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {
        return _constructMaximumBinaryTree(nums, 0, nums.size());
    }
    TreeNode* _constructMaximumBinaryTree(vector<int>& nums, int l, int r) {
        if (l >= r) return nullptr;
        int max_num = INT_MIN, max_idx;
        for (int i = l; i < r; i++) {
            if (nums[i] > max_num) {
                max_num = nums[i];
                max_idx = i;
            }
        }
        return new TreeNode(max_num, _constructMaximumBinaryTree(nums, l, max_idx), _constructMaximumBinaryTree(nums, max_idx + 1, r));
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
