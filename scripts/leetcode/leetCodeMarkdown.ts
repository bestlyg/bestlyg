import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '652. 寻找重复的子树',
  url: 'https://leetcode.cn/problems/find-duplicate-subtrees/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.深度优先搜索, Tag.哈希表, Tag.二叉树],
  desc: `给定一棵二叉树 root，返回所有重复的子树。`,
  solutions: [
    {
      script: Script.CPP,
      time: 52,
      memory: 53.7,
      desc: 'map存储相同节点·',
      code: `class Solution {
public:
    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        unordered_map<string, vector<TreeNode*>> m;
        dfs(m, root);
        vector<TreeNode *> ans;
        for (auto &item : m) {
            if (item.second.size() > 1) {
                ans.push_back(item.second[0]);
            }
        }
        return ans;
    }
    string dfs(unordered_map<string, vector<TreeNode*>> &m, TreeNode *root) {
        if (!root) return "";
        string s = "(" + to_string(root->val) + ",[" + dfs(m, root->left) + "],[" + dfs(m, root->right) + "])";
        m[s].push_back(root);
        return s;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
