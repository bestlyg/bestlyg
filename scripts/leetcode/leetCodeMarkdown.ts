import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1051. 高度检查器',
  url: 'https://leetcode.cn/problems/find-and-replace-pattern/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.字符串],
  desc: `返回 words 中与给定模式匹配的单词列表。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.9,
      desc: '排序后比较',
      code: `class Solution {
   public:
    int heightChecker(vector<int>& heights) {
        int n = heights.size();
        vector<int> list(n);
        for (int i = 0; i < n; i++) list[i] = heights[i];
        sort(list.begin(), list.end());
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (list[i] != heights[i]) ans++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
