import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '589. N 叉树的前序遍历',
  url: 'https://leetcode-cn.com/problems/smallest-rotation-with-highest-score/',
  difficulty: Difficulty.困难,
  tag: [Tag.数组, Tag.前缀和],
  desc: `在所有可能的轮调中，返回我们所能得到的最高分数对应的轮调下标 k 。如果有多个答案，返回满足条件的最小的下标 k 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 11.3,
      desc: 'dfs',
      code: `class Solution {
   public:
    vector<int> preorder(Node* root) {
        vector<int> ans;
        if (root) dfs(ans, root);
        return ans;
    }
    void dfs(vector<int>& ans, Node* node) {
        ans.push_back(node->val);
        for (auto& child : node->children) dfs(ans, child);
    }
};`,
    },
    {
      script: Script.CPP,
      time: 24,
      memory: 11.2,
      desc: '迭代',
      code: `class Solution {
    public:
     vector<int> preorder(Node *root) {
         vector<int> ans;
         stack<Node *> s;
         if (root) s.push(root);
         while (s.size()) {
             Node *node = s.top();
             s.pop();
             ans.push_back(node->val);
             for (auto it = node->children.rbegin(); it != node->children.rend();
                  it++)
                 s.push(*it);
         }
         return ans;
     }
 };`,
    },
  ],
};
export default leetCodeMarkdown;
