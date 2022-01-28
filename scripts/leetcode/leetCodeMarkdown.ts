import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1996. 游戏中弱角色的数量',
  url: 'https://leetcode-cn.com/problems/the-number-of-weak-characters-in-the-game/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.贪心, Tag.数组, Tag.排序, Tag.单调栈],
  desc: `返回 弱角色 的数量。`,
  solutions: [
    {
      script: Script.TS,
      time: 696,
      memory: 169.1,
      desc: '排序后用堆比较',
      code: `class Solution {
   public:
    int numberOfWeakCharacters(vector<vector<int>> &properties) {
        int ans = 0;
        map<int, vector<int>> m;
        priority_queue<int, vector<int>, greater<int>> q;
        for (auto &data : properties) m[data[0]].push_back(data[1]);
        for (auto &data : m) {
            sort(data.second.begin(), data.second.end(), greater<int>());
            while (q.size() && q.top() < data.second[0]) q.pop(), ans++;
            for (auto &num : data.second) q.push(num);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
