import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '590. N 叉树的后序遍历',
  url: 'https://leetcode-cn.com/problems/count-nodes-with-the-highest-score/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.深度优先搜索, Tag.数组, Tag.二叉树],
  desc: `请你返回有 最高得分 节点的 数目 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 11.3,
      desc: 'dfs',
      code: `class Solution {
   public:
    vector<int> postorder(Node *root) {
        vector<int> ans;
        if (root) dfs(ans, root);
        return ans;
    }
    void dfs(vector<int> &ans, Node *&root) {
        for (auto &child : root->children) dfs(ans, child);
        ans.push_back(root->val);
    }
};`,
    },
    {
      script: Script.CPP,
      time: 20,
      memory: 12.1,
      desc: '迭代',
      code: `class Solution {
   public:
    vector<int> postorder(Node *root) {
        vector<int> ans;
        stack<Node *> s;
        unordered_set<Node *> sset;
        if (root) s.push(root);
        while (s.size()) {
            Node *node = s.top();
            s.pop();
            if (sset.count(node)) {
                ans.push_back(node->val);
                continue;
            }
            sset.insert(node);
            s.push(node);
            for (auto it = node->children.rbegin(); it != node->children.rend();
                 it++) {
                s.push(*it);
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
