import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '386. 字典序排数',
  url: 'https://leetcode-cn.com/problems/lexicographical-numbers/',
  difficulty: Difficulty.中等,
  tag: [Tag.深度优先搜索, Tag.字典树],
  desc: `给你一个整数 n ，按字典序返回范围 [1, n] 内所有整数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 11.2,
      desc: 'dfs遍历每一层',
      code: `class Solution {
   public:
    vector<int> lexicalOrder(int n) {
        vector<int> ans;
        for (int i = 1; i <= 9; i++) dfs(ans, n, i);
        return ans;
    }
    void dfs(vector<int> &ans, int &max, int num) {
        if (num > max) return;
        ans.push_back(num);
        for (int i = 0; i <= 9; i++) dfs(ans, max, num * 10 + i);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
